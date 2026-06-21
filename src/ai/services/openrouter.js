// src/ai/services/openrouter.js
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callOpenRouter(messages, apiKey) {
    const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
        model: "google/gemini-3.1-flash-image", // ai model
        messages,
        temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenRouter error ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I didn't receive an answer.";
}