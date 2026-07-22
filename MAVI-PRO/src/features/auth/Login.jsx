import { useState } from "react";
import { COLORS, FONTS } from "../../constants/theme";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !pw) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: 28, gap: 24, animation: "fadeIn .4s ease" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 56, height: 56, background: COLORS.primary, clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <span style={{ fontFamily: FONTS.heading, fontSize: 24, color: COLORS.bg }}>M</span>
        </div>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: 32, letterSpacing: 3 }}>
          MAVI <span style={{ color: COLORS.primary }}>PRO</span>
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>Painel do Profissional</p>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { label: "E-mail", val: email, set: setEmail, ph: "seu@email.com", type: "email" },
          { label: "Senha", val: pw, set: setPw, ph: "••••••••", type: "password" }
        ].map(f => (
          <div key={f.label}>
            <p style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 5, fontWeight: 600 }}>{f.label}</p>
            <input
              type={f.type}
              value={f.val}
              onChange={e => f.set(e.target.value)}
              placeholder={f.ph}
              style={{ width: "100%", padding: "12px 14px", background: COLORS.bgElevated, border: `1px solid ${COLORS.border}`, borderRadius: 11, color: COLORS.text, fontFamily: FONTS.body, fontSize: 14, outline: "none" }}
              onFocus={e => e.target.style.borderColor = COLORS.primary}
              onBlur={e => e.target.style.borderColor = COLORS.border}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{ width: "100%", padding: 14, marginTop: 4, background: COLORS.primary, border: "none", borderRadius: 11, fontFamily: FONTS.heading, fontSize: 19, letterSpacing: 2, color: COLORS.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {loading ? (
            <div style={{ width: 18, height: 18, border: `2px solid ${COLORS.bg}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
          ) : (
            "ENTRAR"
          )}
        </button>
      </div>

      <p style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center" }}>Demo: qualquer e-mail e senha</p>
    </div>
  );
}