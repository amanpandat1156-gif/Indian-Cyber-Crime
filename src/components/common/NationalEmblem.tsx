import React from 'react';

interface NationalEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'gold';
}

export const NationalEmblem: React.FC<NationalEmblemProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
}) => {
  const sizeMap = {
    sm: 'h-10 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      aria-label="State Emblem of India (Lion Capital of Ashoka with Satyameva Jayate)"
    >
      <img
        src="/emblem.png"
        alt="State Emblem of India - Satyameva Jayate"
        className={`${sizeMap[size]} object-contain transition-opacity duration-150 ${
          variant === 'light'
            ? 'invert mix-blend-screen opacity-95'
            : 'mix-blend-multiply'
        }`}
      />
    </div>
  );
};
