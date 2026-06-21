// src/components/AIAgent/AIQuickActions.jsx
import { suggestions } from "../../ai/utils/suggestions";

export default function AIQuickActions({ onSelect, darkMode }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 4,
      }}
    >
      {suggestions.map((action) => (
        <button
          key={action}
          onClick={() => onSelect(action)}
          style={{
            padding: "6px 12px",
            borderRadius: "16px",
            border: darkMode
              ? "1px solid rgba(255,255,255,0.15)"
              : "1px solid rgba(0,0,0,0.08)",
            background: darkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.5)",
            color: darkMode ? "#cbd5e1" : "#334155",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 500,
            backdropFilter: "blur(4px)",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = darkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.5)";
          }}
        >
          {action}
        </button>
      ))}
    </div>
  );
}