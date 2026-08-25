import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface AutoFillDemoButtonProps {
  onAutoFill: () => void;
  label?: string;
  className?: string;
}

export const AutoFillDemoButton: React.FC<AutoFillDemoButtonProps> = ({
  onAutoFill,
  label = 'Auto-Fill Demo Scenario',
  className = '',
}) => {
  const [filled, setFilled] = useState(false);

  const handleClick = () => {
    onAutoFill();
    setFilled(true);
    setTimeout(() => setFilled(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
        filled
          ? 'bg-emerald-600 text-white'
          : 'bg-[#FFF7ED] text-[#9A3412] border border-[#FFEDD5] hover:bg-[#FFEDD5] hover:border-[#FDBA74]'
      } ${className}`}
      title="Populate this form with realistic hackathon sample data for rapid evaluation"
    >
      {filled ? (
        <>
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Demo Data Loaded</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>✨ {label}</span>
        </>
      )}
    </button>
  );
};
