// theme.js
// Centraliza todos los colores y valores de estilo de la app.
// Modifica aquí para cambiar el aspecto global de la aplicación.

const theme = {
  colors: {
    // Fondos
    background: '#EEF2F7',         // Fondo general de la pantalla
    card: '#FFFFFF',               // Fondo de la tarjeta/formulario
    inputBackground: '#FFFFFF',    // Fondo de los campos de texto
    inputBorder: '#E0E4EA',        // Borde de los campos de texto
    inputBorderFocused: '#1A1A2E', // Borde del campo enfocado

    // Textos
    textPrimary: '#1A1A2E',        // Títulos y texto principal
    textSecondary: '#6B7280',      // Labels y texto secundario
    textPlaceholder: '#B0B7C3',    // Placeholder de los inputs
    textLink: '#1A1A2E',           // Links (Forgot password, Sign up)

    // Botón principal
    buttonPrimary: '#1A1A2E',      // Fondo del botón Sign in
    buttonPrimaryText: '#FFFFFF',  // Texto del botón Sign in

    // Botones sociales
    buttonSocial: '#FFFFFF',       // Fondo de botones Google/Facebook
    buttonSocialBorder: '#E0E4EA', // Borde de botones sociales
    buttonSocialText: '#1A1A2E',   // Texto de botones sociales

    // Divisor
    divider: '#E0E4EA',            // Línea del "or"
    dividerText: '#6B7280',        // Texto del "or"

    // Checkbox
    checkboxBorder: '#D1D5DB',     // Borde del checkbox
    checkboxChecked: '#1A1A2E',    // Color cuando está marcado

    // Marca
    brand: '#4A90D9',              // Color del logo/marca (azul Sitemark)

    // Sombras
    shadow: 'rgba(0, 0, 0, 0.08)',
  },

  // Tipografía
  fontSizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 30,
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Espaciado
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Bordes
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    full: 999,
  },

  // Sombras (para boxShadow en estilo)
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 5,
    },
    button: {
      shadowColor: '#1A1A2E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
      elevation: 3,
    },
  },
};

export default theme;