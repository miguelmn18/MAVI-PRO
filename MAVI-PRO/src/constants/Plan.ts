// 1. Tipagem das funcionalidades de um plano
export interface PlanFeature {
  text: string;          // Descrição do recurso
  isAvailable: boolean;  // Se está incluso ou bloqueado no plano
  isHighlighted?: boolean; // Se deve ter destaque visual (brilho/emoji)
  note?: string;         // Observação adicional (ex: "deduzido automaticamente")
}

// Módulos que o app controla por permissão
export type ModuleAllowed = 'agenda' | 'financeiro' | 'ia' | 'fidelizacao';

// Estrutura de um Plano
export interface Plan {
  id: string;
  label: string;
  price: string;
  period: string;
  color: string;
  badge: string;
  headline: string;
  features: PlanFeature[];
  allowed: ModuleAllowed[];
  cta: string;
}

// 2. Chaves dos planos disponíveis no sistema (Tipo usado no App.tsx)
export type PlanKey = 'free' | 'mavi' | 'diamante';

// 3. Objeto Principal com as regras de negócio
export const PLANS: Record<PlanKey, Plan> = {
  free: {
    id: "free",
    label: "Free",
    price: "R$ 0",
    period: "sempre grátis",
    color: "#888880",
    badge: "GRÁTIS",
    headline: "Comece sem pagar nada",
    features: [
      { text: "1 profissional", isAvailable: true },
      { text: "Agendamento ilimitado", isAvailable: true },
      { text: "2% de comissão por agendamento", isAvailable: true, note: "deduzido automaticamente" },
      { text: "Gestão financeira", isAvailable: false },
      { text: "Múltiplos profissionais", isAvailable: false },
      { text: "Fidelização de clientes", isAvailable: false },
      { text: "Controle de estoque", isAvailable: false },
      { text: "Social Mavi IA", isAvailable: false },
      { text: "Isenção da taxa de 2%", isAvailable: false },
    ],
    allowed: ["agenda"],
    cta: "Usar Grátis",
  },
  mavi: {
    id: "mavi",
    label: "Plano MV",
    price: "R$ 59,99",
    period: "/mês",
    color: "#FFD700",
    badge: "POPULAR",
    headline: "Para empresas em crescimento",
    features: [
      { text: "3 profissionais", isAvailable: true },
      { text: "Agendamento ilimitado", isAvailable: true },
      { text: "Isenção da taxa de 2%", isAvailable: true },
      { text: "Gestão financeira", isAvailable: true },
      { text: "Dashboard por profissional", isAvailable: true },
      { text: "Relatório de despesas", isAvailable: true },
      { text: "Social Mavi IA", isAvailable: false },
      { text: "Sistema de fidelização", isAvailable: false },
      { text: "Controle de estoque", isAvailable: false },
    ],
    allowed: ["agenda", "financeiro"],
    cta: "Assinar MV",
  },
  diamante: {
    id: "diamante",
    label: "Diamante",
    price: "R$ 89,99",
    period: "/mês",
    color: "#B9F2FF",
    badge: "COMPLETO",
    headline: "O poder total da sua empresa",
    features: [
      { text: "✨ Tudo do Plano MV", isAvailable: true, isHighlighted: true },
      { text: "✨ Social Mavi IA", isAvailable: true, isHighlighted: true, note: "especialista em social mídia" },
      { text: "✨ Sistema de Fidelização", isAvailable: true, isHighlighted: true, note: "pontos + WhatsApp automático" },
      { text: "Controle de estoque", isAvailable: true },
      { text: "Gestão financeira detalhada", isAvailable: true, note: "gráficos e relatórios completos" },
      { text: "Integrações premium", isAvailable: true, note: "WhatsApp, Google, Mercado Pago, PagSeguro, Pix e link de pagamento" },
      { text: "Profissionais ilimitados", isAvailable: true },
      { text: "Isenção da taxa de 2%", isAvailable: true },
    ],
    allowed: ["agenda", "financeiro", "ia", "fidelizacao"],
    cta: "Assinar Diamante",
  },
} as const;