import { COLORS } from "../../constants/theme";

export const BOTTOM_NAV_ITEMS = [
  { id: "agenda", icon: "📅", label: "Agenda" },
  { id: "menu", icon: "☰", label: "Menu" },
  { id: "ia", icon: "🤖", label: "Mavi IA" },
  { id: "fidelizacao", icon: "⭐", label: "Fideliz." },
  { id: "financeiro", icon: "💰", label: "Finanças" },
];

export function BottomNav({ activeScreen, onSelect, getLockReason }) {
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${COLORS.border}`, background: COLORS.bgSurface, flexShrink: 0 }}>
      {BOTTOM_NAV_ITEMS.map(n => {
        const active = activeScreen === n.id;
        const lockReason = getLockReason(n.id);

        return (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "9px 4px 10px",
              border: "none",
              cursor: "pointer",
              background: active ? COLORS.primaryGlow : "transparent",
              borderTop: active ? `2px solid ${COLORS.primary}` : "2px solid transparent",
              position: "relative"
            }}
          >
            <span style={{ fontSize: 17, opacity: lockReason ? 0.4 : 1 }}>{n.icon}</span>
            <span style={{ fontSize: 9, color: active ? COLORS.primary : lockReason ? `${COLORS.textMuted}55` : COLORS.textMuted, fontWeight: active ? 700 : 400 }}>
              {n.label}
            </span>
            {lockReason && <span style={{ position: "absolute", top: 6, right: "50%", transform: "translateX(9px)", fontSize: 8 }}>🔒</span>}
          </button>
        );
      })}
    </div>
  );
}