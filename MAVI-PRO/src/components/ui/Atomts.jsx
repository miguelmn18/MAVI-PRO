import { COLORS, FONTS } from "../../constants/theme";
import { MONTHS } from "../../constants/mockData";

export const Pill = ({ children, color = COLORS.primary }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: color + "22", color, letterSpacing: 0.4 }}>
    {children}
  </span>
);

export const SLabel = ({ children }) => (
  <p style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>
    {children}
  </p>
);

export const HBar = ({ pct, color = COLORS.primary, h = 5 }) => (
  <div style={{ height: h, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 3, transition: "width 1s ease" }} />
  </div>
);

export function MiniStat({ label, value, accent = COLORS.text, icon }) {
  return (
    <div style={{ background: COLORS.bgSurface, border: `1px solid ${COLORS.border}`, borderRadius: 11, padding: "13px 14px", flex: 1, minWidth: 90 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
        <span style={{ fontSize: 15 }}>{icon}</span>
      </div>
      <div style={{ fontFamily: FONTS.heading, fontSize: 22, letterSpacing: 1, color: accent, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

export function Ring({ pts, size = 62 }) {
  const r = (size - 7) / 2, c = 2 * Math.PI * r, fill = (Math.min(pts, 100) / 100) * c;
  const col = pts >= 100 ? COLORS.primary : pts >= 60 ? COLORS.success : COLORS.textMuted;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={COLORS.border} strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={5}
          strokeDasharray={c} strokeDashoffset={c - fill} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: FONTS.heading, fontSize: 13, color: col }}>{pts}</span>
      </div>
    </div>
  );
}

export function Av({ letter, size = 36, color = COLORS.primary }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg,${color},${COLORS.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.heading, fontSize: size * 0.44, color: COLORS.bg, flexShrink: 0 }}>
      {letter}
    </div>
  );
}

export function MiniChart({ data, color = COLORS.primary, h = 70 }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: h }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: "100%", background: i === data.length - 1 ? color : color + "44", height: `${(v / max) * (h - 14)}px`, borderRadius: "3px 3px 0 0", minHeight: 3 }} />
          <span style={{ fontSize: 9, color: COLORS.textMuted }}>{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function SHead({ title, accent, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ fontFamily: FONTS.heading, fontSize: 26, letterSpacing: 2 }}>{title}{accent && <span style={{ color: COLORS.primary }}> {accent}</span>}</h2>
      {sub && <p style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 2 }}>{sub}</p>}
    </div>
  );
}

export function Card({ children, style = {}, glow = false }) {
  return <div style={{ background: COLORS.bgSurface, border: `1px solid ${glow ? COLORS.primary : COLORS.border}`, borderRadius: 12, padding: 14, ...style }}>{children}</div>;
}

export function Locked({ planNeeded, onUpgrade }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 14, padding: 24, textAlign: "center", animation: "fadeIn .3s ease" }}>
      <div style={{ fontSize: 48 }}>🔒</div>
      <h3 style={{ fontFamily: FONTS.heading, fontSize: 22, letterSpacing: 2 }}>RECURSO BLOQUEADO</h3>
      <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6 }}>Disponível no <strong style={{ color: COLORS.primary }}>{planNeeded}</strong>.</p>
      <button onClick={onUpgrade} style={{ marginTop: 6, padding: "12px 26px", background: COLORS.primary, border: "none", borderRadius: 11, fontFamily: FONTS.heading, fontSize: 17, letterSpacing: 2, color: COLORS.bg, cursor: "pointer" }}>VER PLANOS</button>
    </div>
  );
}