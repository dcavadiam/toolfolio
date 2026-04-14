"use client";

import { formatLabel, cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Badge from "../ui/badge";
import { Separator } from "../ui/separator";

const SLOT_GRADIENTS = [
  "from-primary/40 via-violet-500/25 to-fuchsia-400/20 dark:from-primary/30 dark:via-violet-600/20 dark:to-fuchsia-900/25",
  "from-sky-400/25 via-primary/30 to-indigo-300/25 dark:from-sky-900/30 dark:via-primary/25 dark:to-indigo-950/35",
  "from-fuchsia-400/20 via-primary/25 to-violet-300/30 dark:from-fuchsia-900/25 dark:via-primary/20 dark:to-violet-950/30",
  "from-indigo-400/30 via-card-slot to-primary/25 dark:from-indigo-900/25 dark:via-card-slot dark:to-primary/20",
] as const;

function slotGradientIndex(category: string, title: string) {
  let h = 0;
  const s = `${category}\0${title}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % SLOT_GRADIENTS.length;
}

interface ToolCardProps {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  tags: string[];
  type: "free" | "paid";
  icon?: React.ReactNode;
  link: string;
}

export default function ToolCard({
  title,
  description,
  category,
  subCategory,
  tags,
  type,
  icon,
  link,
}: ToolCardProps) {
  const toolInitials = title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const gradIdx = slotGradientIndex(category, title);
  const slotGradient = SLOT_GRADIENTS[gradIdx];

  return (
    <div
      className={cn(
        "group relative flex h-full w-full max-w-lg flex-col gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 text-card-foreground",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_32px_-12px_rgba(15,23,42,0.12)]",
        "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_12px_40px_-16px_rgba(0,0,0,0.45)]",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "motion-safe:hover:-translate-y-1.5 motion-safe:hover:border-primary/30",
        "motion-safe:hover:shadow-[0_20px_50px_-18px_rgba(99,102,241,0.35),0_1px_0_0_rgba(255,255,255,0.08)_inset]",
        "dark:motion-safe:hover:shadow-[0_24px_60px_-20px_rgba(99,102,241,0.28),0_1px_0_0_rgba(255,255,255,0.06)_inset]",
      )}
    >
      <div
        className={cn(
          "relative min-h-[5.25rem] w-full overflow-hidden rounded-xl p-4 shadow-inner ring-1 ring-inset ring-white/25 dark:ring-white/[0.07]",
          "bg-gradient-to-br",
          slotGradient,
        )}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 size-[7.5rem] rounded-full bg-primary/30 blur-2xl motion-safe:animate-toolfolio-float dark:bg-primary/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 size-[9rem] rounded-full bg-fuchsia-500/20 blur-3xl motion-safe:animate-toolfolio-float [animation-delay:-2.5s] dark:bg-fuchsia-600/15"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%)] bg-[length:200%_100%] opacity-0 motion-safe:transition-opacity motion-safe:duration-500 group-hover:opacity-100 motion-safe:group-hover:animate-toolfolio-shimmer dark:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]"
          aria-hidden
        />
        <div className="relative flex h-full min-h-[3.25rem] w-full items-center justify-center gap-4 [&_svg]:size-12 [&_svg]:text-primary [&_svg]:drop-shadow-sm">
          {icon || (
            <span
              className="select-none bg-gradient-to-br from-primary via-violet-600 to-fuchsia-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-sm dark:from-primary-300 dark:via-violet-400 dark:to-fuchsia-400"
            >
              {toolInitials}
            </span>
          )}
        </div>
      </div>

      <div className="flex w-full items-start justify-between gap-3">
        <h3 className="flex-1 text-left text-lg font-bold leading-snug text-card-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <Badge variant={type}>{type === "free" ? "Gratis" : "Pago"}</Badge>
      </div>

      <p className="line-clamp-3 text-left text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/25 group-hover:bg-primary/5 group-hover:text-foreground"
            >
              {formatLabel(tag)}
            </span>
          ))}
        </div>
      )}

      <Separator className="opacity-60" />

      <div className="flex w-full items-center justify-between gap-3">
        <p className="min-w-0 flex-1 text-left text-sm text-muted-foreground">
          <span className="font-medium text-foreground/90">
            {formatLabel(subCategory)}
          </span>
          <span className="mx-1.5 text-muted-foreground/60">·</span>
          <span>{formatLabel(category)}</span>
        </p>
        <button
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
            "bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300",
            "motion-safe:group-hover:scale-105 motion-safe:group-hover:bg-primary motion-safe:group-hover:text-primary-foreground",
            "motion-safe:group-hover:ring-primary motion-safe:active:scale-95",
            "!p-0",
          )}
          type="button"
          aria-label={`Abrir ${title} en una pestaña nueva`}
          onClick={() => {
            window.open(link, "_blank");
          }}
        >
          <ArrowRightIcon
            className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
            aria-hidden
          />
          <span className="sr-only">{`Abrir ${title}`}</span>
        </button>
      </div>
    </div>
  );
}
