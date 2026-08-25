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
    sm: 'w-8 h-12',
    md: 'w-10 h-14',
    lg: 'w-14 h-20',
    xl: 'w-20 h-28',
  };

  const fillMap = {
    dark: '#12304A',
    light: '#FFFFFF',
    gold: '#D8891C',
  };

  const fill = fillMap[variant];

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}
      aria-label="State Emblem of India (Lion Capital of Ashoka)"
      role="img"
    >
      <svg
        viewBox="0 0 120 160"
        className="w-full h-full"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ========================================================= */}
        {/* LION CAPITAL OF ASHOKA AT SARNATH (THREE VISIBLE LIONS)  */}
        {/* ========================================================= */}

        {/* 1. CENTER FORWARD-FACING LION */}
        {/* Mane & Head Top */}
        <path d="M60 6 C52 6 45 11 43 18 C39 16 33 17 31 22 C29 27 30 32 34 36 C31 40 33 46 37 49 C42 54 49 55 56 56 C53 61 50 66 49 71 C45 70 40 71 39 75 C38 78 40 82 44 83 L44 86 L76 86 L76 83 C80 82 82 78 81 75 C80 71 75 70 71 71 C70 66 67 61 64 56 C71 55 78 54 83 49 C87 46 89 40 86 36 C90 32 91 27 89 22 C87 17 81 16 77 18 C75 11 68 6 60 6 Z" />
        
        {/* Facial Details - Eyes, Muzzle & Whiskers Contour */}
        <ellipse cx="53" cy="28" rx="2.5" ry="3.5" fill={variant === 'dark' ? '#FFFFFF' : '#0B2235'} opacity="0.9" />
        <ellipse cx="67" cy="28" rx="2.5" ry="3.5" fill={variant === 'dark' ? '#FFFFFF' : '#0B2235'} opacity="0.9" />
        <circle cx="53.5" cy="28" r="1.2" fill={fill} />
        <circle cx="66.5" cy="28" r="1.2" fill={fill} />
        {/* Snout / Nose */}
        <path d="M57 32 L63 32 L61 36 L59 36 Z" fill={variant === 'dark' ? '#FFFFFF' : '#0B2235'} opacity="0.85" />
        <path d="M56 36 Q60 40 64 36" stroke={variant === 'dark' ? '#FFFFFF' : '#0B2235'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Forehead Ridge */}
        <path d="M55 16 C58 14 62 14 65 16 C66 18 65 21 63 23 C60 23 57 23 55 22 C54 20 54 18 55 16 Z" fill={variant === 'dark' ? '#0B2235' : variant === 'light' ? '#E2E8F0' : '#B7791F'} opacity="0.6" />

        {/* 2. LEFT PROFILE LION */}
        <path d="M29 24 C24 23 18 26 17 32 C16 37 18 41 22 44 C19 47 21 52 24 55 C29 58 35 58 40 57 C37 50 33 42 33 34 C33 30 30 26 29 24 Z" opacity="0.95" />
        <ellipse cx="23" cy="33" rx="1.8" ry="2.5" fill={variant === 'dark' ? '#FFFFFF' : '#0B2235'} opacity="0.85" />
        <path d="M19 38 L23 37" stroke={variant === 'dark' ? '#FFFFFF' : '#0B2235'} strokeWidth="1.2" strokeLinecap="round" />

        {/* 3. RIGHT PROFILE LION */}
        <path d="M91 24 C96 23 102 26 103 32 C104 37 102 41 98 44 C101 47 99 52 96 55 C91 58 85 58 80 57 C83 50 87 42 87 34 C87 30 90 26 91 24 Z" opacity="0.95" />
        <ellipse cx="97" cy="33" rx="1.8" ry="2.5" fill={variant === 'dark' ? '#FFFFFF' : '#0B2235'} opacity="0.85" />
        <path d="M101 38 L97 37" stroke={variant === 'dark' ? '#FFFFFF' : '#0B2235'} strokeWidth="1.2" strokeLinecap="round" />

        {/* ========================================================= */}
        {/* THE CIRCULAR ABACUS (PEDESTAL WITH DHARMA CHAKRA & RELIEFS) */}
        {/* ========================================================= */}
        
        {/* Upper Abacus Rim */}
        <rect x="20" y="87" width="80" height="4.5" rx="1.5" />

        {/* Abacus Frieze Background */}
        <rect x="18" y="91.5" width="84" height="24" rx="1" fill={variant === 'dark' ? '#0F273D' : variant === 'light' ? '#1E3A54' : '#C77A14'} opacity="0.3" />
        <rect x="18" y="91.5" width="84" height="24" rx="1" fill="none" stroke={fill} strokeWidth="1.2" />

        {/* Central Ashoka Chakra (Wheel of Law with 24 Spokes Representation) */}
        <circle cx="60" cy="103.5" r="9.5" fill={variant === 'dark' ? '#FFFFFF' : '#0B2235'} />
        <circle cx="60" cy="103.5" r="8.2" fill="none" stroke={fill} strokeWidth="1.5" />
        <circle cx="60" cy="103.5" r="2.2" fill={fill} />
        
        {/* 12 Rendered Spokes for crisp rendering at all sizes */}
        <line x1="60" y1="94.5" x2="60" y2="112.5" stroke={fill} strokeWidth="0.9" />
        <line x1="51" y1="103.5" x2="69" y2="103.5" stroke={fill} strokeWidth="0.9" />
        <line x1="53.6" y1="97.1" x2="66.4" y2="109.9" stroke={fill} strokeWidth="0.9" />
        <line x1="66.4" y1="97.1" x2="53.6" y2="109.9" stroke={fill} strokeWidth="0.9" />
        <line x1="56.3" y1="94.8" x2="63.7" y2="112.2" stroke={fill} strokeWidth="0.8" />
        <line x1="63.7" y1="94.8" x2="56.3" y2="112.2" stroke={fill} strokeWidth="0.8" />

        {/* Left Bull (Steed/Relief on Left) */}
        <path
          d="M26 105 C29 101 34 100 37 103 C39 104 40 107 38 109 C36 110 32 109 29 108 C27 108 26 106 26 105 Z"
          fill={fill}
        />
        <path d="M26 104 C25 101 27 98 30 99" stroke={fill} strokeWidth="1" fill="none" />

        {/* Right Galloping Horse (Steed/Relief on Right) */}
        <path
          d="M94 105 C91 101 86 100 83 103 C81 104 80 107 82 109 C84 110 88 109 91 108 C93 108 94 106 94 105 Z"
          fill={fill}
        />
        <path d="M94 104 C95 101 93 98 90 99" stroke={fill} strokeWidth="1" fill="none" />

        {/* Lower Abacus Molding */}
        <rect x="20" y="115.5" width="80" height="3.5" rx="1" />

        {/* ========================================================= */}
        {/* BELL-SHAPED INVERTED LOTUS FLOWER BASE                     */}
        {/* ========================================================= */}
        <path
          d="M28 119 L92 119 C90 128 78 134 60 134 C42 134 30 128 28 119 Z"
          fill={fill}
        />
        
        {/* Lotus Petal Ridges */}
        <path
          d="M44 119 C47 127 54 130 60 131 C66 130 73 127 76 119"
          fill="none"
          stroke={variant === 'dark' ? '#FAF8F5' : '#0B2235'}
          strokeWidth="1.4"
          opacity="0.4"
        />

        {/* Pedestal Base Floor */}
        <rect x="22" y="134" width="76" height="3" rx="1" />

        {/* ========================================================= */}
        {/* NATIONAL MOTTO: सत्यमेव जयते (SATYAMEVA JAYATE)           */}
        {/* "Truth Alone Triumphs" inscribed below the abacus/base    */}
        {/* ========================================================= */}
        <text
          x="60"
          y="152"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fontFamily="'Inter', 'Noto Sans Devanagari', 'Samyak Devanagari', 'Mangal', 'Arial Unicode MS', sans-serif"
          letterSpacing="0.4"
          fill={fill}
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
};
