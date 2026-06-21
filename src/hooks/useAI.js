// src/hooks/useAI.js
import { useState, useCallback } from "react";
import { buildInitialMessages } from "../ai/utils/buildContext";
import { sendMessageToAI } from "../ai/services/aiService";
import { sanitizeMessage } from "../ai/utils/sanitizeMessage"; // 👈 import

export function useAI() {
  const [messages, setMessages] = useState(() => buildInitialMessages());
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  const sendMessage = useCallback(
    async (userContent) => {
      if (!apiKey) {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "API key is missing. Please set VITE_OPENROUTER_API_KEY.",
          },
        ]);
        return;
      }

      const updatedMessages = [...messages, { role: "user", content: userContent }];
      setMessages(updatedMessages);
      setChatHistory((prev) => [...prev, { role: "user", content: userContent }]);

      setIsLoading(true);

      try {
        const reply = await sendMessageToAI(updatedMessages, apiKey);
        const cleanReply = sanitizeMessage(reply); // 👈 sanitize here
        setMessages((prev) => [...prev, { role: "assistant", content: cleanReply }]);
        setChatHistory((prev) => [...prev, { role: "assistant", content: cleanReply }]);
      } catch (error) {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${error.message}` },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, apiKey]
  );

  const resetChat = useCallback(() => {
    const initial = buildInitialMessages();
    setMessages(initial);
    setChatHistory([]);
  }, []);

  return { chatHistory, isLoading, sendMessage, resetChat };
}