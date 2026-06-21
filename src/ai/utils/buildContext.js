// src/ai/utils/buildContext.js
import { systemPrompt } from "../prompts/systemPrompt";

export const buildInitialMessages = () => [
    { role: "system", content: systemPrompt }
];