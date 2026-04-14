import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { getToolCatalogJson } from "@/lib/ai/tool-catalog";

const MAX_USER_CHARS = 2000;
const MAX_UI_MESSAGES = 14;

const SYSTEM_PROMPT = `Eres el asistente de Toolfolio. Tu única fuente de verdad es el catálogo JSON que recibes abajo.

Reglas:
- Responde siempre en español, con tono claro y breve.
- Solo puedes recomendar herramientas que existan literalmente en el catálogo (mismo título y enlace).
- Si ninguna encaja bien, dilo y sugiere la alternativa más cercana del catálogo o indica que no hay una buena coincidencia.
- Prioriza 2 a 5 herramientas cuando tenga sentido; incluye el enlace oficial de cada una tal como viene en "link".
- No inventes herramientas, categorías ni URLs.
- No repitas el JSON completo en la respuesta.

Catálogo de herramientas (JSON):
`;

function trimMessages(messages: UIMessage[]): UIMessage[] {
  if (messages.length <= MAX_UI_MESSAGES) return messages;
  return messages.slice(-MAX_UI_MESSAGES);
}

function lastUserTextTooLong(messages: UIMessage[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return false;
  const text = lastUser.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
  return text.length > MAX_USER_CHARS;
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Falta GOOGLE_GENERATIVE_AI_API_KEY. Crea una clave en Google AI Studio y añádela a .env.local.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Cuerpo JSON inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = (body as { messages?: UIMessage[] }).messages;
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Falta messages." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (lastUserTextTooLong(messages)) {
    return new Response(
      JSON.stringify({
        error: `El mensaje supera ${MAX_USER_CHARS} caracteres.`,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const trimmed = trimMessages(messages);
  const catalog = getToolCatalogJson();

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(trimmed);
  } catch {
    return new Response(JSON.stringify({ error: "Mensajes inválidos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: `${SYSTEM_PROMPT}${catalog}`,
    messages: modelMessages,
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}
