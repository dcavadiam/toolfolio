"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import ChatMarkdown from "@/components/chat/ChatMarkdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function textFromMessage(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function ToolRecommendationChat() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, stop, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!open) return;
    textareaRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  function submitMessage() {
    const text = input.trim();
    if (!text || busy) return;
    clearError();
    void sendMessage({ text });
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitMessage();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 p-0 sm:bottom-6 sm:right-6">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Asistente de recomendaciones de herramientas"
          aria-modal="false"
          className="pointer-events-auto flex max-h-[min(420px,70vh)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
            <p className="text-sm font-semibold text-foreground">
              Recomendador
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="shrink-0"
              onClick={() => setOpen(false)}
              aria-label="Cerrar asistente"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            <p className="rounded-xl bg-muted/80 px-3 py-2 text-sm text-muted-foreground">
              Pregunta qué necesitas (p. ej. optimizar SVG, fuentes para web o
              emails HTML) y te recomendaré herramientas de Toolfolio.
            </p>

            {messages.map((m) => {
              const text = textFromMessage(m);
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm break-words",
                    isUser
                      ? "ml-6 whitespace-pre-wrap bg-primary text-primary-foreground"
                      : "mr-4 bg-muted text-foreground"
                  )}
                >
                  {isUser ? (
                    text
                  ) : (
                    <ChatMarkdown>{text}</ChatMarkdown>
                  )}
                </div>
              );
            })}

            {error && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error.message}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-border p-2"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Describe tu necesidad…"
                rows={2}
                maxLength={2000}
                disabled={busy}
                className="min-h-[44px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none disabled:opacity-50"
                aria-label="Mensaje para el asistente"
              />
              {busy ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                  onClick={() => void stop()}
                >
                  Parar
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0"
                  disabled={!input.trim()}
                  aria-label="Enviar mensaje"
                >
                  <Send className="size-4" />
                </Button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="pointer-events-auto relative inline-flex size-14 items-center justify-center">
        {!open && (
          <>
            <span
              className="motion-safe:absolute motion-safe:inset-0 motion-safe:rounded-full motion-safe:bg-primary/40 motion-safe:animate-ping motion-safe:[animation-duration:2.25s]"
              aria-hidden
            />
            <span
              className="motion-safe:absolute motion-safe:-inset-1 motion-safe:rounded-full motion-safe:bg-primary/25 motion-safe:blur-md motion-safe:animate-pulse"
              aria-hidden
            />
          </>
        )}
        <Button
          type="button"
          size="icon-lg"
          className={cn(
            "relative z-10 size-14 !rounded-full shadow-[0_6px_28px_-6px_rgba(67,56,202,0.55)] ring-2 ring-primary/45 ring-offset-2 ring-offset-background transition-[transform,box-shadow] hover:scale-105 hover:shadow-[0_8px_32px_-4px_rgba(67,56,202,0.65)] active:scale-95",
            open && "ring-primary/25 shadow-lg"
          )}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-haspopup="dialog"
          onClick={() => setOpen((o) => !o)}
          aria-label={
            open
              ? "Cerrar recomendador de herramientas"
              : "Abrir recomendador de herramientas"
          }
        >
          <MessageCircle className="size-6" />
        </Button>
      </div>
    </div>
  );
}
