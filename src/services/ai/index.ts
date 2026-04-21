import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AIProviderConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export abstract class AIProvider {
  abstract sendMessageStream(
    messages: ChatMessage[],
    systemPrompt: string
  ): AsyncGenerator<string, void, unknown>;
}

// ─── Gemini Provider ──────────────────────────────────────────────────────────
export class GeminiProvider extends AIProvider {
  private genAI: GoogleGenAI;
  private model: string;

  constructor(config: AIProviderConfig) {
    super();
    this.genAI = new GoogleGenAI({ apiKey: config.apiKey });
    this.model = config.model;
  }

  async *sendMessageStream(
    messages: ChatMessage[],
    systemPrompt: string
  ): AsyncGenerator<string, void, unknown> {
    const stream = await this.genAI.models.generateContentStream({
      model: this.model,
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      config: {
        systemInstruction: systemPrompt,
      }
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  }
}

// ─── OpenAI/OpenRouter Provider ────────────────────────────────────────────────
export class OpenAIProvider extends AIProvider {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(config: AIProviderConfig) {
    super();
    this.apiKey = config.apiKey;
    this.model = config.model;
    this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
  }

  async *sendMessageStream(
    messages: ChatMessage[],
    systemPrompt: string
  ): AsyncGenerator<string, void, unknown> {
    const isOpenRouter = this.baseUrl.includes('openrouter.ai');

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...(isOpenRouter ? {
          'HTTP-Referer': window.location.origin,
          'X-Title': 'D&D AI Master',
        } : {}),
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.text,
          })),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Failed to get response body reader');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const cleanedLine = line.replace(/^data: /, '').trim();
        if (cleanedLine === '' || cleanedLine === '[DONE]') continue;

        try {
          const parsed = JSON.parse(cleanedLine);
          const content = parsed.choices[0]?.delta?.content;
          if (content) yield content;
        } catch (e) {
          // Incomplete JSON in chunk
        }
      }
    }
  }
}

export class FallbackAIProvider extends AIProvider {
  constructor(private providers: AIProvider[]) {
    super();
    if (providers.length === 0) {
      throw new Error('FallbackAIProvider necesita al menos un proveedor.');
    }
  }

  async *sendMessageStream(messages: ChatMessage[], systemPrompt: string): AsyncGenerator<string, void, unknown> {
    let lastError: any;
    
    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        const stream = provider.sendMessageStream(messages, systemPrompt);
        let hasYielded = false;
        
        try {
          for await (const chunk of stream) {
            hasYielded = true;
            yield chunk;
          }
          // Complete response from this provider
          return; 
        } catch (streamError) {
          if (hasYielded) {
             // UI already showed partial message, so we cannot safely fallback. Let it crash.
             throw streamError;
          }
          // Failed before emitting chunks (e.g. Rate Limit / 429 / 502)
          throw streamError;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Fallback] Falló un proveedor (index: ${i}), intentando el siguiente en la lista... (${err.message})`);
        continue;
      }
    }
    
    throw new Error(`Todos los modelos fallaron. Último error: ${lastError?.message || 'Desconocido'}`);
  }
}

// ─── AI Factory ──────────────────────────────────────────────────────────────
export function getAIProvider(): AIProvider {
  const provider = import.meta.env.VITE_AI_PROVIDER || 'gemini';
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const baseUrl = import.meta.env.VITE_AI_ENDPOINT;

  if (!apiKey) {
    throw new Error(`Configuración incompleta: falta VITE_AI_API_KEY para el proveedor ${provider}`);
  }

  const modelsStr = import.meta.env.VITE_AI_MODELS || import.meta.env.VITE_AI_MODEL || '';
  const modelsArray = modelsStr.split(',').map(m => m.trim().replace(/^['"](.*)['"]$/, '$1')).filter(Boolean);

  if (modelsArray.length === 0) {
    modelsArray.push(provider.toLowerCase() === 'gemini' ? 'gemini-2.0-flash' : 'gpt-4o');
  }

  const instantiatedProviders: AIProvider[] = modelsArray.map(model => {
    switch (provider.toLowerCase()) {
      case 'gemini':
        return new GeminiProvider({ apiKey, model, baseUrl });
      case 'openai':
      case 'openrouter':
        return new OpenAIProvider({
          apiKey,
          model,
          baseUrl: baseUrl || (provider.toLowerCase() === 'openrouter' ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1')
        });
      default:
        throw new Error(`Proveedor de IA no soportado: ${provider}`);
    }
  });

  if (instantiatedProviders.length === 1) {
    return instantiatedProviders[0];
  }

  return new FallbackAIProvider(instantiatedProviders);
}
