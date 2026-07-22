import { useState } from "react";
import { GLOBAL_STYLES, COLORS } from "./constants/theme";
// Importando PLANS e o tipo PlanKey
import { PLANS, type PlanKey } from "./constants/Plan";
import { MOCK_SERVICES, MOCK_PROFESSIONALS } from "./constants/mockData";

// Layout Componentes
import { TopBar } from "./components/layout/TopBar";
import { BottomNav } from "./components/layout/BottomNav";
import { Locked } from "./components/ui/Atoms";

// Features
import { Login } from "./features/auth/Login";
import { Agenda } from "./features/agenda/Agenda";
import { Financeiro } from "./features/financeiro/Financeiro";
import { SocialMaviIA } from "./features/ia/SocialMaviIA";
import { Fidelizacao } from "./features/fidelizacao/Fidelizacao";
import { MenuGrid } from "./features/menu/MenuGrid";
import { Clientes } from "./features/clientes/Clientes";
import { Profissional } from "./features/profissionais/Profissional";
import { Servicos } from "./features/servicos/Servicos";
import { Produtos } from "./features/produtos/Produtos";
import { Pacotes } from "./features/pacotes/Pacotes";
import { Vendas } from "./features/vendas/Vendas";
import { Relatorios } from "./features/relatorios/Relatorios";
import { Estabelecimento } from "./features/empresa/Estabelecimento";
import { Configuracoes } from "./features/configuracoes/Configuracoes";
import { Suporte } from "./features/suporte/Suporte";
import { ClientView } from "./features/client-booking/ClientView";

// Tipagem dos estados
type Mode = "login" | "barber" | "client";
type Screen = 
  | "agenda" | "financeiro" | "ia" | "fidelizacao" | "menu" 
  | "clientes" | "profissional" | "servicos" | "produtos" 
  | "pacotes" | "vendas" | "relatorios" | "estabelecimento" 
  | "configuracoes" | "suporte";

export default function App() {
  const [mode, setMode] = useState<Mode>("login");
  const [screen, setScreen] = useState<Screen>("agenda");
  const [plan, setPlan] = useState<PlanKey>("free");

  // Obtém os dados do plano atual
  const currentPlanData = PLANS[plan];

  // Tipando o parâmetro da função
  const getLockReason = (screenId: string): string | null => {
    if (!currentPlanData) return null;
    if (screenId === "financeiro" && !currentPlanData.allowed.includes("financeiro")) return "Plano MV";
    if (screenId === "ia" && !currentPlanData.allowed.includes("ia")) return "Plano Diamante";
    if (screenId === "fidelizacao" && !currentPlanData.allowed.includes("fidelizacao")) return "Plano Diamante";
    return null;
  };

  const renderScreen = () => {
    const lockReason = getLockReason(screen);
    if (lockReason && ["financeiro", "ia", "fidelizacao"].includes(screen)) {
      return <Locked planNeeded={lockReason} onUpgrade={() => setScreen("configuracoes")} />;
    }

    switch (screen) {
      case "agenda": return <Agenda />;
      case "financeiro": return <Financeiro />;
      case "ia": return <SocialMaviIA />;
      case "fidelizacao": return <Fidelizacao />;
      case "menu": return <MenuGrid onNavigate={setScreen} />;
      case "clientes": return <Clientes />;
      case "profissional": return <Profissional />;
      case "servicos": return <Servicos />;
      case "produtos": return <Produtos />;
      case "pacotes": return <Pacotes />;
      case "vendas": return <Vendas />;
      case "relatorios": return <Relatorios />;
      case "estabelecimento": return <Estabelecimento />;
      case "configuracoes": return <Configuracoes plan={plan} onSelectPlan={setPlan} onNavigate={setScreen} />;
      case "suporte": return <Suporte />;
      default: return <Agenda />;
    }
  };

  // Visão: Login
  if (mode === "login") {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ maxWidth: 430, margin: "0 auto", height: "100vh", background: COLORS.bgSurface, display: "flex", flexDirection: "column" }}>
          <Login onLogin={() => setMode("barber")} />
          <div style={{ padding: "0 28px 24px", textAlign: "center" }}>
            <button
              onClick={() => setMode("client")}
              style={{ background: "transparent", border: "none", color: COLORS.textMuted, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
            >
              Ver visão do cliente →
            </button>
          </div>
        </div>
      </>
    );
  }

  // Visão: Cliente Externo
  if (mode === "client") {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ maxWidth: 430, margin: "0 auto", height: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 16px" }}>
            <ClientView services={MOCK_SERVICES} profs={MOCK_PROFESSIONALS} />
          </div>
          <div style={{ padding: "10px 16px", borderTop: `1px solid ${COLORS.border}`, textAlign: "center" }}>
            <button
              onClick={() => setMode("login")}
              style={{ background: "transparent", border: "none", color: COLORS.textMuted, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
            >
              ← Voltar para login do profissional
            </button>
          </div>
        </div>
      </>
    );
  }

  // Visão: Painel do Profissional
  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ maxWidth: 430, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", background: COLORS.bg }}>
        <TopBar
          planKey={plan}
          planData={currentPlanData}
          onSwitchToClient={() => setMode("client")}
          onOpenSettings={() => setScreen("configuracoes")}
        />

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px 8px" }}>
          {renderScreen()}
        </div>

        <BottomNav
          activeScreen={screen}
          onSelect={setScreen}
          getLockReason={getLockReason}
        />
      </div>
    </>
  );
}