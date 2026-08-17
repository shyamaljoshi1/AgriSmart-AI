export const Colors = {
  // Primary Green Theme (Vibrant & Crisp)
  primary: '#059669', // Emerald 600
  primaryDark: '#047857',
  primaryLight: '#10b981',
  primaryBg: '#ecfdf5',
  
  // Secondary & Accents
  accent: '#d97706', // Amber 600
  accentLight: '#fef3c7',
  danger: '#dc2626', // Red 600
  dangerBg: '#fef2f2',
  warning: '#ea580c',
  info: '#0284c7', // Sky 600
  infoBg: '#f0f9ff',
  
  // Light Mode Colors (Applied Globally across all views)
  bgDark: '#f8fafc',      // Soft Slate Light Page Background
  bgCardDark: '#ffffff',  // Pure White Container / Card Background
  bgCardLight: '#ffffff',
  bgLight: '#f1f5f9',
  
  textPrimaryDark: '#0f172a',    // High-contrast slate charcoal text
  textSecondaryDark: '#475569',  // Medium slate secondary text
  textPrimaryLight: '#0f172a',
  textSecondaryLight: '#64748b',
  
  borderDark: '#e2e8f0',   // Light subtle border
  borderLight: '#cbd5e1',
  
  // Glassmorphism & Modal Overlays for Light Mode
  glassBg: 'rgba(255, 255, 255, 0.92)',
  glassDarkBg: 'rgba(255, 255, 255, 0.95)',
  overlay: '#f1f5f9',
};

export const Shadows = {
  small: {
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  medium: {
    shadowColor: '#475569',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#334155',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
};
