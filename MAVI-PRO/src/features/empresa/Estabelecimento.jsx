import { COLORS, FONTS } from "../../constants/theme";
import { Card, SHead, SLabel, Pill } from "../../components/ui/Atoms";

export function Estabelecimento() {
  const companyInfo = [
    { icon: "📍", label: "Endereço", value: "Rua das Flores, 123 — Centro, São Paulo/SP" },
    { icon: "📞", label: "Telefone", value: "(11) 3333-4444" },
    { icon: "🕐", label: "Seg-Sex", value: "09:00 às 20:00" },
    { icon: "🕐", label: "Sáb-Dom", value: "09:00 às 18:00" },
    { icon: "📸", label: "Instagram", value: "@empresamavi" },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText("mavipro.app/empresa-mavi");
  };

  return (
    <div style={{ animation: "fadeUp .3s ease", display: "flex", flexDirection: "column", gap: 14 }}>
      <SHead title="MINHA" accent="EMPRESA" />
      <Card glow>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.heading, fontSize: 24, color: COLORS.bg }}>
            ✂
          </div>
          <div>
            <div style={{ fontFamily: FONTS.heading, fontSize: 20, letterSpacing: 1 }}>Empresa Mavi</div>
            <Pill color={COLORS.success}>✅ Ativo</Pill>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {companyInfo.map(item => (
            <div key={item.label} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 13, marginTop: 1 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", marginTop: 14, padding: 11, background: COLORS.primary, border: "none", borderRadius: 10, fontFamily: FONTS.heading, fontSize: 15, letterSpacing: 2, color: COLORS.bg, cursor: "pointer" }}>
          EDITAR INFORMAÇÕES
        </button>
      </Card>

      <Card>
        <SLabel>Link do cliente</SLabel>
        <div style={{ background: COLORS.bgCard, borderRadius: 9, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: COLORS.textMuted, flex: 1, fontFamily: "monospace" }}>mavipro.app/empresa-mavi</span>
          <button onClick={handleCopyLink} style={{ padding: "5px 10px", background: COLORS.primary, border: "none", borderRadius: 7, fontFamily: FONTS.heading, fontSize: 11, color: COLORS.bg, cursor: "pointer" }}>
            COPIAR
          </button>
        </div>
        <p style={{ fontSize: 11, color: COLORS.textMuted }}>Compartilhe este link com seus clientes para agendamento direto.</p>
      </Card>
    </div>
  );
}