// src/components/AIAgent/AIInput.jsx
import { useState } from "react";

export default function AIInput({ onSend, disabled, darkMode }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const inputStyle = {
    background: darkMode
      ? "rgba(255,255,255,0.1)"
      : "rgba(255,255,255,0.5)",
    backdropFilter: "blur(8px)",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid rgba(0,0,0,0.08)",
    color: darkMode ? "#f1f5f9" : "#0f172a",
    placeholderColor: darkMode ? "#94a3b8" : "#64748b",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about Ernest..."
        disabled={disabled}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "24px",
          outline: "none",
          fontSize: "14px",
          ...inputStyle,
          transition: "border 0.2s ease, box-shadow 0.2s ease",
          boxShadow: disabled ? "none" : "0 2px 8px rgba(0,0,0,0.05)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = darkMode
            ? "rgba(129,140,248,0.5)"
            : "rgba(59,130,246,0.4)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = darkMode
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.08)";
        }}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        style={{
          padding: "10px 18px",
          borderRadius: "24px",
          border: "none",
          background: disabled
            ? "rgba(128,128,128,0.3)"
            : darkMode
            ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
            : "linear-gradient(135deg, #3b82f6, #2563eb)",
          color: "#fff",
          fontWeight: 600,
          fontSize: "13.5px",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 4px 12px rgba(59,130,246,0.4)",
          transition: "all 0.2s ease",
        }}
      >
        Send
      </button>
    </form>
  );
}