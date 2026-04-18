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
  ): Promise<AsyncIterable<string>>;
}

// ─── Gemini Provider ──────────────────────────────────────────────────────────
export class GeminiProvider extends AIProvider {
  private genAI: GoogleGenAI;
  private model: string;

  constructor(config: AIProviderConfig) {
    super();
    this.genAI = new GoogleGenAI(config.apiKey);
    this.model = config.model;
  }

  async *sendMessageStream(
    messages: ChatMessage[],
    systemPrompt: string
  ): Promise<AsyncIterable<string>> {
    const chat = this.genAI.getGenerativeModel({
      model: this.model,
      systemInstruction: systemPrompt,
    }).startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      })),
    });

    const lastMessage = messages[messages.length - 1]?.text || '';
    const result = await chat.sendMessageStream(lastMessage);

    for await (const chunk of result.stream) {
      yield chunk.text();
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
  ): Promise<AsyncIterable<string>> {
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

// ─── AI Factory ──────────────────────────────────────────────────────────────
export function getAIProvider(): AIProvider {
  const provider = import.meta.env.VITE_AI_PROVIDER || 'gemini';
  const config: AIProviderConfig = {
    apiKey: import.meta.env.VITE_AI_API_KEY,
    model: import.meta.env.VITE_AI_MODEL,
    baseUrl: import.meta.env.VITE_AI_ENDPOINT,
  };

  if (!config.apiKey) {
    throw new Error(`Configuración incompleta: falta VITE_AI_API_KEY para el proveedor ${provider}`);
  }

  switch (provider.toLowerCase()) {
    case 'gemini':
      return new GeminiProvider({
        ...config,
        model: config.model || 'gemini-2.0-flash'
      });
    case 'openai':
    case 'openrouter':
      return new OpenAIProvider({
        ...config,
        model: config.model || 'gpt-4o',
        baseUrl: config.baseUrl || (provider === 'openrouter' ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1')
      });
    default:
      throw new Error(`Proveedor de IA no soportado: ${provider}`);
  }
}
