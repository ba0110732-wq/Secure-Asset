import OpenAI from "openai";

const baseURL = process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"];
const apiKey = process.env["AI_INTEGRATIONS_OPENAI_API_KEY"];

if (!baseURL || !apiKey) {
  throw new Error("AI integration env vars missing");
}

export const openai = new OpenAI({ baseURL, apiKey });

export const MODEL = "gpt-5.4";

export async function chatJson<T>(
  systemPrompt: string,
  userPrompt: string,
): Promise<T> {
  const resp = await openai.chat.completions.create({
    model: MODEL,
    max_completion_tokens: 4096,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  const content = resp.choices[0]?.message?.content ?? "{}";
  return JSON.parse(content) as T;
}

export async function chatText(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  const resp = await openai.chat.completions.create({
    model: MODEL,
    max_completion_tokens: 4096,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  });
  return resp.choices[0]?.message?.content ?? "";
}
