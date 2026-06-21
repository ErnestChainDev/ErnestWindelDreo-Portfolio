// src/components/AIAgent/AIMessage.jsx
export default function AIMessage({ role, content, darkMode }) {
  const isAssistant = role === "assistant";

  const bubbleStyle = {
    user: {
      alignSelf: "flex-end",
      background: darkMode
        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
        : "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "#ffffff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
    assistant: {
      alignSelf: "flex-start",
      background: darkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.6)",
      color: darkMode ? "#e2e8f0" : "#1e293b",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      border: darkMode
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(0,0,0,0.05)",
    },
  };

  const current = isAssistant ? bubbleStyle.assistant : bubbleStyle.user;

  return (
    <div
      style={{
        ...current,
        padding: "10px 14px",
        borderRadius: "18px",
        maxWidth: "80%",
        marginBottom: "4px",
        wordBreak: "break-word",
        fontSize: "13.5px",
        lineHeight: 1.55,
        whiteSpace: "pre-wrap",
        backdropFilter: "blur(4px)",
        transition: "all 0.2s ease",
      }}
    >
      {content}
    </div>
  );
}