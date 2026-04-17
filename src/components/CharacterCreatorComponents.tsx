import React, { memo } from 'react';
import { Medal } from 'lucide-react';

interface Props {
  abilityOptions: string[];
  backgroundBonuses: Record<string, number | undefined>;
  onCycle: (stat: any) => void;
  backgroundId: string;
}

/**
 * AttributeBonusSelector
 * Memoized component to prevent full wizard re-renders during rapid stat clicking.
 * This isolates DOM reconciliation to just the attribute buttons.
 */
export const AttributeBonusSelector = memo(({ abilityOptions, backgroundBonuses, onCycle, backgroundId }: Props) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleClick = (statId: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    onCycle(statId);
    // Short cooldown to stabilize DOM before allowing next click
    setTimeout(() => setIsProcessing(false), 200);
  };

  return (
    <div className="flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/10 mt-2">
      <div className="flex items-center gap-2 text-gold font-display text-sm mb-2">
        <Medal size={18} /> BONOS DE ATRIBUTO (Elige +2/+1 o +1/+1/+1)
      </div>
      <div className="flex gap-2">
        {abilityOptions.map((statId) => {
          const val = backgroundBonuses[statId] || 0;
          return (
            <button 
              key={`${backgroundId}-${statId}`}
              onClick={() => handleClick(statId)}
              disabled={isProcessing}
              className={`flex-1 p-2 rounded border text-sm font-display transition-all ${
                val > 0 ? 'bg-gold/20 border-gold text-gold' : 'bg-white/5 border-white/10 text-muted'
              }`}
            >
              <span className="pointer-events-none">
                {`${statId.toUpperCase()}${val > 0 ? ' +' + val : ''}`}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-muted italic mt-2 text-center pointer-events-none">
        Haz clic para asignar y ciclar los bonos (Total: 3 puntos)
      </p>
    </div>
  );
}, (prev, next) => {
  // Deep comparison to ensure we only re-render if options or specific bonuses changed
  if (prev.backgroundId !== next.backgroundId) return false;
  if (prev.abilityOptions.length !== next.abilityOptions.length) return false;
  
  const bonusesChanged = prev.abilityOptions.some(stat => 
    prev.backgroundBonuses[stat] !== next.backgroundBonuses[stat]
  );
  
  return !bonusesChanged;
});

/**
 * ErrorBoundary
 * Simple catch-all to prevent the "Black Screen of Death" if React reconciliation fails.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 text-center">
          <h1 className="text-4xl text-gold font-display mb-4">¡Ups! Algo salió mal</h1>
          <p className="text-secondary mb-8">La magia se volvió inestable. Por favor, reinicia la creación.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Reiniciar Forja
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
