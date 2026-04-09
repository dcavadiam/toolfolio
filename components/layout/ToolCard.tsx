"use client";
import { formatLabel } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Badge from "../ui/badge";
import { Separator } from "../ui/separator";

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
  return (
    <div className="flex w-full max-w-lg flex-col items-start justify-center gap-4 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm">
      {/* icon */}
      <div className="flex h-20 w-full items-center justify-center gap-4 rounded-xl bg-card-slot p-4 ring-1 ring-inset ring-border/40 [&_svg]:text-primary">
        {icon || (
          <span className="text-2xl font-bold text-secondary-foreground dark:text-neutral-100">
            {toolInitials}
          </span>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="flex-1 text-left text-lg font-bold text-card-foreground">{title}</h3>
        <Badge variant={type}>{type === "free" ? "Gratis" : "Pago"}</Badge>
      </div>

      <p className="text-sm text-muted-foreground text-left">{description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {formatLabel(tag)}
            </span>
          ))}
        </div>
      )}
      <Separator />
      <div className="flex items-center justify-between gap-2 w-full">
        <p className="flex-1 text-left text-sm text-muted-foreground">
          <span className="font-medium text-foreground/90">
            {formatLabel(subCategory)}
          </span>
          <span className="mx-1.5 text-border">·</span>
          <span>{formatLabel(category)}</span>
        </p>
        <button className="!p-0" onClick={() => {
          window.open(link, "_blank");
        }}>
          <ArrowRightIcon className="size-4 text-primary" />
        </button>
      </div>
    </div>
  );
}
