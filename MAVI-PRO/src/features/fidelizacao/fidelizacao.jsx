import { useState } from "react";
import { COLORS, FONTS } from "../../constants/theme";
import { Card, SHead, MiniStat, Pill, Ring, HBar } from "../../components/ui/Atoms";

// Nota: Certifique-se de importar ou passar CLIENTS via props
export function Fidelizacao({ clients = [] }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const sc = s => s === "resgate" ? COLORS.primary : s === "ativo" ? COLORS.success : COLORS.textMuted;
  const sl = s => s === "resgate" ? "🎉 Resgate" : s === "ativo" ? "✅ Ativo" : "💤 Inativo";

  return (
    <div style={{ animation: "fadeUp .3s ease", display: "flex", flexDirection: "column", gap: 14 }}>
      <SHead title="SISTEMA DE" accent="FIDELIZAÇÃO" sub="3 pts/desafio · 5 pts/atendimento · Meta: 100 pts" />
      <div style={{ display: "flex", gap: 8 }}>
        <MiniStat label="Clientes" value={clients.length} icon="👥" />
        <MiniStat label="P/ resgate" value={clients.filter(c => c.points >= 100).length} accent={COLORS.primary} icon="🎉" />
      </div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar cliente..."
        style={{ width: "100%", padding: "11px 14px", background: COLORS.bgSurface, border: `1px solid ${COLORS.border}`, borderRadius: 10, color: COLORS.text, fontFamily: FONTS.body, fontSize: 13, outline: "none" }}
        onFocus={e => e.target.style.borderColor = COLORS.primary}
        onBlur={e => e.target.style.borderColor = COLORS.border}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(c => {
          const isOpen = open === c.id;
          return (
            <Card key={c.id} glow={c.points >= 100} style={{ cursor: "pointer", border: `1px solid ${isOpen ? COLORS.primary : c.points >= 100 ? COLORS.primary + "44" : COLORS.border}` }}>
              <div onClick={() => setOpen(isOpen ? null : c.id)} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Ring pts={c.points} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</span>
                    <Pill color={sc(c.status)}>{sl(c.status)}</Pill>
                  </div>
                  <div style={{ marginTop: 7 }}>
                    <HBar pct={c.points} color={c.points >= 100 ? COLORS.primary : COLORS.success} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>{c.points}/100 pts</span>
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>✂️{c.cuts} · 🏆{c.challenges}</span>
                    </div>
                  </div>
                </div>
              </div>
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, animation: "fadeUp .2s ease" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: c.points >= 100 ? 10 : 0 }}>
                    {[{ l: "Pts atend.", v: `${c.cuts * 5}` }, { l: "Pts desafios", v: `${c.challenges * 3}` }, { l: "Tel.", v: c.phone }, { l: "Faltam", v: c.points >= 100 ? "✅" : `${100 - c.points} pts` }].map(x => (
                      <div key={x.l} style={{ background: COLORS.bgCard, padding: "8px 10px", borderRadius: 8 }}>
                        <div style={{ fontSize: 10, color: COLORS.textMuted }}>{x.l}</div>
                        <div style={{ fontWeight: 600, color: COLORS.primary, fontSize: 12, marginTop: 1 }}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                  {c.points >= 100 && <button style={{ width: "100%", padding: 11, background: COLORS.primary, border: "none", borderRadius: 10, fontFamily: FONTS.heading, fontSize: 15, letterSpacing: 2, color: COLORS.bg, cursor: "pointer" }}>APLICAR RESGATE</button>}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}