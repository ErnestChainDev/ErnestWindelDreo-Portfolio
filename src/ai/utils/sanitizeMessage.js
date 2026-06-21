// src/ai/utils/sanitizeMessage.js

const EMOJI_MAP = {
  email: "📧",
  location: "📍",
  linkedin: "🔗",
  github: "🐙",
  x: "🐦",
  twitter: "🐦",
  facebook: "📘",
  instagram: "📷",
  phone: "📞",
  website: "🌐",
  frontend: "👨‍💻",
  backend: "⚙️",
  database: "🗄️",
  qa: "🧪",
  testing: "🧪",
  skills: "🛠️",
  experience: "💼",
  education: "🎓",
  projects: "🚀",
  certifications: "🏅",
  contact: "📬",
  about: "ℹ️",
  summary: "📝",
};

export function sanitizeMessage(rawText) {
  if (!rawText) return "";

  let cleaned = rawText
    // Remove bold and italic markers
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    // Remove remaining asterisks used as bullet points
    .replace(/^[\s]*\*\s+/gm, "• ")
    // Remove extra spaces after bullet
    .replace(/•\s+/g, "• ");

  // Add emojis to known headings
  cleaned = cleaned
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return line;

      // Remove bullet markers like • or -
      const headingCandidate = trimmed.replace(/^[•-]\s*/, ""); // 👈 no escape for dash
      const lower = headingCandidate.toLowerCase();

      for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
        if (lower === key || lower.startsWith(key + ":")) {
          if (!headingCandidate.startsWith(emoji)) {
            line = line.replace(headingCandidate, `${emoji} ${headingCandidate}`);
          }
          break;
        }
      }

      // Handle colons like "Email: ..."
      const colonIndex = headingCandidate.indexOf(":");
      if (colonIndex > 0) {
        const label = headingCandidate.substring(0, colonIndex).trim().toLowerCase();
        if (EMOJI_MAP[label] && !headingCandidate.startsWith(EMOJI_MAP[label])) {
          line = line.replace(headingCandidate, `${EMOJI_MAP[label]} ${headingCandidate}`);
        }
      }
      return line;
    })
    .join("\n");

  return cleaned;
}