import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'larger';
type ContrastMode = 'standard' | 'high-contrast';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  toggleContrast: () => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [contrastMode, setContrastMode] = useState<ContrastMode>('standard');

  useEffect(() => {
    const root = document.documentElement;
    // Handle font size adjustments
    root.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-larger');
    if (fontSize === 'large') {
      root.classList.add('font-scale-large');
    } else if (fontSize === 'larger') {
      root.classList.add('font-scale-larger');
    }

    // Handle high contrast
    if (contrastMode === 'high-contrast') {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [fontSize, contrastMode]);

  const toggleContrast = () => {
    setContrastMode((prev) => (prev === 'standard' ? 'high-contrast' : 'standard'));
  };

  const resetAccessibility = () => {
    setFontSize('normal');
    setContrastMode('standard');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        contrastMode,
        setContrastMode,
        toggleContrast,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
