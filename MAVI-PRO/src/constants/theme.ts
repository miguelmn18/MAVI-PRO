// 1. Paleta de Cores (Design System)
export const COLORS = {
  bg: "#0F172A",           // Fundo principal (Dark Slate)
  bgSurface: "#1E293B",    // Fundo de cards/modais
  primary: "#6366F1",      // Cor de destaque (Indigo)
  primaryHover: "#4F46E5",
  text: "#F8FAFC",         // Texto principal (Branco suave)
  textMuted: "#94A3B8",    // Texto secundário (Cinza)
  border: "#334155",       // Linhas de separação e bordas
  success: "#22C55E",      // Status positivo / confirmações
  warning: "#EAB308",      // Alertas
  danger: "#EF4444",       // Erros / Ações destrutivas
} as const;

// Tipagem para autocomplete do TypeScript
export type ColorKeys = keyof typeof COLORS;

// 2. Estilos Globais (Reset CSS + Layout Base)
export const GLOBAL_STYLES = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: ${COLORS.bg};
    color: ${COLORS.text};
    overflow-x: hidden;
  }

  /* Customização de barra de rolagem para desktop/mobile */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.border};
    border-radius: 3px;
  }

  button {
    font-family: inherit;
  }
`;