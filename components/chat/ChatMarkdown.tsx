import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

const components: Components = {
  p: ({ children }) => (
    <p className="mb-2 text-[0.9375rem] leading-relaxed last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1.5 pl-4 text-[0.9375rem]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1.5 pl-4 text-[0.9375rem]">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className?.includes("language-"));
    if (isBlock) {
      return (
        <code className={cn("font-mono text-[0.8125rem]", className)}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded-md bg-background/90 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground ring-1 ring-border/60">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg border border-border/60 bg-background/90 p-2.5 text-xs leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-primary/40 pl-3 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-border" />,
  h1: ({ children }) => (
    <p className="mb-2 text-base font-semibold text-foreground">{children}</p>
  ),
  h2: ({ children }) => (
    <p className="mb-2 text-[0.9375rem] font-semibold text-foreground">{children}</p>
  ),
  h3: ({ children }) => (
    <p className="mb-1.5 text-[0.9375rem] font-semibold text-foreground">{children}</p>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto rounded-lg border border-border/60">
      <table className="w-full min-w-[200px] border-collapse text-left text-[0.8125rem]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/60">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-border px-2 py-1.5 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border/80 px-2 py-1.5 align-top">{children}</td>
  ),
};

type ChatMarkdownProps = {
  className?: string;
  children: string;
};

export default function ChatMarkdown({ className, children }: ChatMarkdownProps) {
  return (
    <div className={cn("chat-md [&_p:first-child]:mt-0 [&_ul]:marker:text-primary/80", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
