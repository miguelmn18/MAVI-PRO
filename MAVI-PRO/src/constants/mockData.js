export const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
export const REV_DATA = [3200, 4100, 3750, 5200, 4800, 6100];
export const EXP_DATA = [800, 950, 870, 1100, 990, 1200];
export const ATD_DATA = [120, 145, 132, 180, 165, 210];
export const AGD_DATA = [130, 155, 140, 195, 178, 225];
export const PROD_DATA = [18, 24, 20, 31, 28, 35];

export const PACKAGES = [
  { id: 1, name: "Combo VIP", services: ["Degradê", "Barba", "Hidratação"], price: 75, saves: 20 },
  { id: 2, name: "Básico", services: ["Corte Simples", "Barba"], price: 40, saves: 5 },
  { id: 3, name: "Premium", services: ["Navalhado", "Barba", "Sobrancelha"], price: 70, saves: 15 },
];

export const AGENDA_DATA = [
  { id: 1, client: "Mateus Costa", service: "Degradê", time: "09:00", prof: "Lucas", status: "confirmado" },
  { id: 2, client: "Rodrigo Lima", service: "Navalhado", time: "10:30", prof: "Rafael", status: "confirmado" },
  { id: 3, client: "Felipe Nunes", service: "Corte + Barba", time: "11:00", prof: "Diego", status: "pendente" },
  { id: 4, client: "Carlos H.", service: "Corte Simples", time: "14:00", prof: "Lucas", status: "confirmado" },
  { id: 5, client: "Bruno Alves", service: "Afro", time: "15:30", prof: "Diego", status: "pendente" },
];

export const SALES = [
  { id: 1, product: "Pomada Modeladora", qty: 2, total: 70, date: "05/05", prof: "Lucas" },
  { id: 2, product: "Óleo de Barba", qty: 1, total: 42, date: "04/05", prof: "Rafael" },
  { id: 3, product: "Shampoo Anticaspa", qty: 3, total: 84, date: "03/05", prof: "Diego" },
  { id: 4, product: "Cera Capilar", qty: 1, total: 30, date: "02/05", prof: "Lucas" },
];

export const INTEGRATIONS = {
  principais: [
    { icon: "💬", name: "WhatsApp Business", desc: "Automação de fidelização e lembretes automáticos para clientes.", badge: "Diamante" },
    { icon: "⭐", name: "Google Meu Negócio", desc: "Envie o link do seu perfil Google para o cliente avaliar sua empresa diretamente.", badge: "Diamante" },
    { icon: "📅", name: "Google Calendar", desc: "Sincronize agendamentos com a agenda dos profissionais automaticamente.", badge: "Plano MV" },
  ],
  pagamentos: [
    { icon: "💳", name: "Mercado Pago", desc: "Envie link de pagamento Pix e cartão pelo app." },
    { icon: "🟩", name: "PagSeguro", desc: "Envie link de pagamento PagSeguro para o cliente." },
  ],
  gestao: [
    { icon: "📊", name: "Google Sheets", desc: "Exporte relatórios financeiros automaticamente." },
    { icon: "📦", name: "Bling ERP", desc: "Gestão de estoque integrada (Diamante)." },
  ],
  marketing: [
    { icon: "📸", name: "Instagram", desc: "Publique conteúdos sugeridos pela Social Mavi IA." },
    { icon: "🎵", name: "TikTok", desc: "Agende e publique Reels de tendências." },
  ],
};