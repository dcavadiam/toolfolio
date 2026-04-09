import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "free" | "paid";
}
export default function Badge({ children, variant = "free" }: BadgeProps) {
  const variantClasses = {
    free: "bg-tag-free text-white",
    paid: "bg-tag-paid text-white",
  };
  return (
    <span
      className={cn(
        variantClasses[variant],
        "inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-widest",
      )}
    >
      {children}
    </span>
  );
}