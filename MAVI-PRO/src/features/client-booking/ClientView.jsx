import { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../constants/theme";
import { SLabel, Card, Av } from "../../components/ui/Atoms";

// Mocks necessários (ou passados via Props)
const TIMES = ["09:00", "10:00", "10:30", "11:00", "14:00", "15:00", "15:30", "16:00"];
const DATES = ["Hoje, 07/05", "Amanhã, 08/05", "Sex, 09/05", "Sáb, 10/05"];

export function ClientView({ services = [], profs = [] }) {
  const [step, setStep] = useState("servico");
  const [sel, setSel] = useState({ service: null, prof: null, time: null, date: null });
  const [form, setForm] = useState({ name: "", phone: "" });
  const [botStep, setBotStep] = useState(0);

  if (step === "confirmado") {
    const botMsgs = [
      { from: "bot", text: `Olá, ${form.name}! 👋 Seu agendamento foi recebido.` },
      { from: "bot", text: `✂️ Serviço: ${sel.service}\n👤 Profissional: ${sel.prof}\n📅 ${sel.date} às ${sel.time}` },
      { from: "bot", text: "Para confirmar seu agendamento, responda com SIM ✅" },
      { from: "user", text: "SIM" },
      { from: "bot", text: "✅ Agendamento confirmado! Te esperamos. Qualquer dúvida é só falar aqui. 💈" },
    ];
    const visible = botMsgs.slice(0, botStep + 1);

    useEffect(() => {
      if (botStep < botMsgs.length - 1) {
        const t = setTimeout(() => setBotStep(s => s + 1), 1200);
        return () => clearTimeout(t);
      }
    }, [botStep, botMsgs.length]);

    return (
      <div style={{ animation: "slideUp .4s ease", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
          <h2 style={{ fontFamily: FONTS.heading, fontSize: 24, letterSpacing: 2, color: COLORS.success }}>AGENDADO!</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>Confirmação via WhatsApp</p>
        </div>

        <div style={{ background: COLORS.bgSurface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.success, animation: "blink 1.5s ease infinite" }} />
            <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>Bot WhatsApp · Simulação</span>
          </div>
          {visible.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", animation: "fadeUp .3s ease" }}>
              <div style={{ maxWidth: "80%", padding: "9px 12px", borderRadius: 11, background: m.from === "user" ? "#25D366" : COLORS.bgElevated, color: COLORS.text, fontSize: 13, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setStep("servico"); setSel({}); setForm({ name: "", phone: "" }); setBotStep(0); }}
          style={{ width: "100%", padding: 12, background: COLORS.bgSurface, border: `1px solid ${COLORS.border}`, borderRadius: 11, fontFamily: FONTS.body, fontSize: 13, color: COLORS.textMuted, cursor: "pointer" }}
        >
          Fazer novo agendamento
        </button>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp .3s ease", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ textAlign: "center", paddingBottom: 4 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, background: COLORS.primary, clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: FONTS.heading, fontSize: 11, color: COLORS.bg }}>M</span>
          </div>
          <span style={{ fontFamily: FONTS.heading, fontSize: 18, letterSpacing: 3 }}>MAVI <span style={{ color: COLORS.primary }}>PRO</span></span>
        </div>
        <h2 style={{ fontFamily: FONTS.heading, fontSize: 22, letterSpacing: 1 }}>EMPRESA <span style={{ color: COLORS.primary }}>MAVI</span></h2>
        <p style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>Rua das Flores, 123 — Centro, SP</p>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {["servico", "profissional", "horario", "dados"].map((s, i) => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: ["servico", "profissional", "horario", "dados"].indexOf(step) >= i ? COLORS.primary : COLORS.border, transition: "background .3s" }} />
        ))}
      </div>

      {step === "servico" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SLabel>Escolha o serviço</SLabel>
          {services.map(s => (
            <div key={s.id} onClick={() => { setSel(v => ({ ...v, service: s.name })); setStep("profissional"); }}
              style={{ background: COLORS.bgSurface, border: `1px solid ${COLORS.border}`, borderRadius: 11, padding: "13px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>⏱ {s.duration}</div>
              </div>
              <div style={{ fontFamily: FONTS.heading, fontSize: 18, color: COLORS.primary }}>R${s.price}</div>
            </div>
          ))}
        </div>
      )}

      {step === "profissional" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setStep("servico")} style={{ background: "transparent", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 18 }}>←</button>
            <SLabel>Escolha o profissional</SLabel>
          </div>
          {[{ avatar: "?", name: "Sem preferência", role: "Primeiro disponível", id: 0 }, ...profs].map(b => (
            <div key={b.id} onClick={() => { setSel(v => ({ ...v, prof: b.name })); setStep("horario"); }}
              style={{ background: COLORS.bgSurface, border: `1px solid ${sel.prof === b.name ? COLORS.primary : COLORS.border}`, borderRadius: 11, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
              <Av letter={b.avatar} size={38} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>{b.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === "horario" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setStep("profissional")} style={{ background: "transparent", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 18 }}>←</button>
            <SLabel>Escolha data e horário</SLabel>
          </div>
          <div>
            <p style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>Data</p>
            <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 2 }}>
              {DATES.map(d => (
                <div key={d} onClick={() => setSel(v => ({ ...v, date: d }))}
                  style={{ flexShrink: 0, padding: "8px 13px", borderRadius: 9, background: sel.date === d ? COLORS.primary : COLORS.bgSurface, border: `1px solid ${sel.date === d ? COLORS.primary : COLORS.border}`, cursor: "pointer" }}>
                  <div style={{ fontSize: 11, color: sel.date === d ? COLORS.bg : COLORS.textMuted, fontWeight: 600, whiteSpace: "nowrap" }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>Horário</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
              {TIMES.map(t => (
                <div key={t} onClick={() => setSel(v => ({ ...v, time: t }))}
                  style={{ padding: "9px 4px", borderRadius: 9, background: sel.time === t ? COLORS.primary : COLORS.bgSurface, border: `1px solid ${sel.time === t ? COLORS.primary : COLORS.border}`, cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: sel.time === t ? COLORS.bg : COLORS.text }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => sel.date && sel.time && setStep("dados")}
            style={{ width: "100%", padding: 12, background: sel.date && sel.time ? COLORS.primary : COLORS.border, border: "none", borderRadius: 11, fontFamily: FONTS.heading, fontSize: 16, letterSpacing: 2, color: COLORS.bg, cursor: sel.date && sel.time ? "pointer" : "not-allowed" }}>
            CONTINUAR
          </button>
        </div>
      )}

      {step === "dados" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setStep("horario")} style={{ background: "transparent", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 18 }}>←</button>
            <SLabel>Confirme seus dados</SLabel>
          </div>
          <Card>
            {[{ l: "Serviço", v: sel.service }, { l: "Profissional", v: sel.prof }, { l: "Data", v: sel.date }, { l: "Horário", v: sel.time }].map(x => (
              <div key={x.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ fontSize: 12, color: COLORS.textMuted }}>{x.l}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{x.v}</span>
              </div>
            ))}
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ key: "name", label: "Nome completo", ph: "Seu nome" }, { key: "phone", label: "Celular (WhatsApp)", ph: "(00) 00000-0000" }].map(f => (
              <div key={f.key}>
                <p style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 5 }}>{f.label}</p>
                <input
                  value={form[f.key]}
                  onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                  placeholder={f.ph}
                  style={{ width: "100%", padding: "11px 13px", background: COLORS.bgSurface, border: `1px solid ${COLORS.border}`, borderRadius: 10, color: COLORS.text, fontFamily: FONTS.body, fontSize: 13, outline: "none" }}
                  onFocus={e => e.target.style.borderColor = COLORS.primary}
                  onBlur={e => e.target.style.borderColor = COLORS.border}
                />
              </div>
            ))}
          </div>
          <button onClick={() => form.name && form.phone && setStep("confirmado")}
            style={{ width: "100%", padding: 13, background: form.name && form.phone ? COLORS.primary : COLORS.border, border: "none", borderRadius: 11, fontFamily: FONTS.heading, fontSize: 17, letterSpacing: 2, color: COLORS.bg, cursor: form.name && form.phone ? "pointer" : "not-allowed" }}>
            CONFIRMAR VIA WHATSAPP
          </button>
          <p style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center" }}>Você receberá uma confirmação no WhatsApp informado</p>
        </div>
      )}
    </div>
  );
}