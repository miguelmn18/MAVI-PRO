import { COLORS, FONTS } from "../../constants/theme";

export function TopBar({ planKey, planData, onSwitchToClient, onOpenSettings }) {
  const getBadgeText = () => {
    if (planKey === "free") return "FREE";
    if (planKey === "mv") return "MV";
    return "💎";
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 10px", background: COLORS.bgSurface, borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 26, height: 26, background: COLORS.primary, clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: FONTS.heading, fontSize: 11, color: COLORS.bg }}>M</span>
        </div>
        <span style={{ fontFamily: FONTS.heading, fontSize: 17, letterSpacing: 3 }}>
          MAVI <span style={{ color: COLORS.primary }}>PRO</span>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={onSwitchToClient}
          style={{ padding: "4px 10px", background: COLORS.bgElevated, border: `1px solid ${COLORS.border}`, borderRadius: 7, color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 10, cursor: "pointer" }}
        >
          👤 Cliente
        </button>

        <button
          onClick={onOpenSettings}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: `${planData.color}20`, border: `1px solid ${planData.color}44`, cursor: "pointer" }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, color: planData.color, fontFamily: FONTS.body }}>
            {getBadgeText()}
          </span>
          <span style={{ fontSize: 9, color: COLORS.textMuted }}>▼</span>
        </button>
      </div>
    </div>
  );
}