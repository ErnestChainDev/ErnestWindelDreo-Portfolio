// src/components/AIAgent/AIWidgetButton.jsx
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

import lightIdle from "../../assets/ai/ai-light-idle.png";
import lightHover from "../../assets/ai/ai-light-hover.png";
import darkIdle from "../../assets/ai/ai-dark-idle.png";
import darkHover from "../../assets/ai/ai-dark-hover.png";

export default function AIWidgetButton({ onClick, isOpen, isDragging, size = 60 }) {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useTheme();
  const theme = darkMode ? "dark" : "light";

  const getImage = () => {
    if (theme === "dark") return isHovered ? darkHover : darkIdle;
    return isHovered ? lightHover : lightIdle;
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        borderRadius: "50%",
        boxShadow: isOpen
          ? "0 0 18px 2px rgba(99, 102, 241, 0.7)"
          : "0 4px 15px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
        width: size,
        height: size,
        overflow: "hidden",
      }}
      aria-label="Toggle AI chat"
    >
      <img
        src={getImage()}
        alt="Ernest AI Agent"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
          display: "block",
        }}
      />
    </button>
  );
}