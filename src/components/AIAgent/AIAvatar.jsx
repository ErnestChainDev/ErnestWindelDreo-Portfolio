// src/components/AIAgent/AIAvatar.jsx
import { useTheme } from "../../hooks/useTheme";
import lightIdle from "../../assets/ai/ai-light-idle.png";
import darkIdle from "../../assets/ai/ai-dark-idle.png";

export default function AIAvatar() {
    const theme = useTheme();
    const src = theme === "dark" ? darkIdle : lightIdle;
    return <img src={src} alt="AI" style={{ width: 40, height: 40 }} />;
}