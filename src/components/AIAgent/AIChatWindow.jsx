// src/components/AIAgent/AIChatWindow.jsx
import AIMessage from "./AIMessage";
import AIInput from "./AIInput";
import AIQuickActions from "./AIQuickActions";
import { useTheme } from "../../hooks/useTheme";
import aiIcon from "../../assets/ai/ai-assisstant.svg"; // 👈 import your SVG

export default function AIChatWindow({
  chatHistory,
  isLoading,
  onSendMessage,
  onClose,
  isMobile,
}) {
  const { darkMode } = useTheme();

  const theme = {
    glassBg: darkMode ? "rgba(15, 15, 25, 0.75)" : "rgba(255, 255, 255, 0.65)",
    glassBorder: darkMode
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(255, 255, 255, 0.4)",
    headerBg: darkMode
      ? "rgba(45, 45, 65, 0.5)"
      : "rgba(255, 255, 255, 0.4)",
    headerText: darkMode ? "#f0f0ff" : "#1e293b",
    closeBtnHover: darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)",
    emptyText: darkMode ? "#94a3b8" : "#64748b",
    thinkingText: darkMode ? "#94a3b8" : "#94a3b8",
    inputContainerBg: darkMode
      ? "rgba(0,0,0,0.15)"
      : "rgba(255,255,255,0.3)",
  };

  const containerStyle = isMobile
    ? {
        position: "fixed",
        bottom: 20,
        right: 12,
        left: 12,
        width: "auto",
        maxWidth: 360,
        height: "auto",
        maxHeight: "55vh",
        borderRadius: "18px",
        zIndex: 1002,
      }
    : {
        position: "fixed",
        bottom: 80,
        right: 20,
        width: 380,
        maxHeight: "70vh",
        borderRadius: "20px",
        zIndex: 1000,
      };

  return (
    <div
      style={{
        ...containerStyle,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        backgroundColor: theme.glassBg,
        border: `1px solid ${theme.glassBorder}`,
        boxShadow: darkMode
          ? "0 25px 45px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 25px 45px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 18px",
          background: theme.headerBg,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: theme.headerText,
          fontWeight: 600,
          fontSize: "15px",
          letterSpacing: "0.3px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.glassBorder}`,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={aiIcon}
            alt="AI"
            style={{
              width: 24,
              height: 24,
              objectFit: "contain",
              filter: darkMode
                ? "invert(1) brightness(2)"
                : "brightness(0) invert(0)", // adjust for theme if needed
            }}
          />
          Ernest AI Assistant
        </span>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: theme.headerText,
            fontSize: "18px",
            cursor: "pointer",
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = theme.closeBtnHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "16px 12px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: "transparent",
          scrollbarWidth: "thin",
          scrollbarColor: `${
            darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"
          } transparent`,
        }}
      >
        {chatHistory.length === 0 && (
          <div
            style={{
              fontSize: "14px",
              color: theme.emptyText,
              textAlign: "center",
              padding: "20px 10px",
              lineHeight: 1.6,
            }}
          >
            Hello! I'm Ernest's AI Assistant.
            <br />
            Ask me anything about him.
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <AIMessage
            key={i}
            role={msg.role}
            content={msg.content}
            darkMode={darkMode}
          />
        ))}
        {isLoading && (
          <div
            style={{
              fontSize: "13px",
              color: theme.thinkingText,
              fontStyle: "italic",
            }}
          >
            Thinking...
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "0 12px 4px" }}>
        <AIQuickActions onSelect={onSendMessage} darkMode={darkMode} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "8px 12px 14px",
          background: theme.inputContainerBg,
          borderTop: `1px solid ${theme.glassBorder}`,
        }}
      >
        <AIInput onSend={onSendMessage} disabled={isLoading} darkMode={darkMode} />
      </div>
    </div>
  );
}