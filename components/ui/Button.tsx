import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function Button({ children, className, variant = "primary", size = "md", onClick, ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-200",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover transition-colors duration-200",
  };
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button className={cn(variantClasses[variant], sizeClasses[size], className)} onClick={onClick} >
      {children}
    </button>
  );
}