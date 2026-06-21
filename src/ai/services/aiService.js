// src/ai/services/aiService.js
import { callOpenRouter } from "./openrouter";

export const sendMessageToAI = async (messages, apiKey) => {
    return await callOpenRouter(messages, apiKey);
};