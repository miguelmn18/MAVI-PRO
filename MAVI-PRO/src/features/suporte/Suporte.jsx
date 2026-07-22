import { COLORS, FONTS } from "../../constants/theme";
import { Card, SHead, SLabel } from "../../components/ui/Atoms";

const HORARIOS = [
  { d: "Segunda a Sexta", h: "08:00 às 20:00" },
  { d: "Sábado", h: "09:00 às 14:00" },
  { d: "Domingo", h: "Fechado" },
];

export function Suporte() {
  const handleOpenWhatsapp = () => {
    window.open("https://wa.me/5511999999999?text=Olá!%20Preciso%20de%20suporte%20com%20o%20MAVI%20PRO", "_blank");
  };

  return (
    <div style={{ animation: "fadeUp .3s ease", display: "flex", flexDirection: "column", gap: 14 }}>
      <SHead title="SUPORTE" accent="MAVI PRO" />
      <Card glow>
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
          <h3 style={{ fontFamily: FONTS.heading, fontSize: 22, letterSpacing: 1, marginBottom: 8 }}>FALE COM A GENTE</h3>
          <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 16 }}>
            Nossa equipe está disponível via WhatsApp para te ajudar com qualquer dúvida sobre o MAVI PRO.
          </p>
          <button
            onClick={handleOpenWhatsapp}
            style={{ width: "100%", padding: 13, background: "#25D366", border: "none", borderRadius: 11, fontFamily: FONTS.heading, fontSize: 17, letterSpacing: 2, color: COLORS.text, cursor: "pointer" }}
          >
            📱 ABRIR WHATSAPP
          </button>
        </div>
      </Card>

      <Card>
        <SLabel>Horário de atendimento</SLabel>
        {HORARIOS.map(x => (
          <div key={x.d} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 13 }}>{x.d}</span>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{x.h}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}