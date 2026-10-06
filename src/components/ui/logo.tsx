import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: 24,
    md: 28,
    lg: 36,
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <GraduationCap size={iconSizes[size]} className="text-primary" />
      <span className={cn("font-heading font-bold text-primary", sizeClasses[size])}>
        ClassCraft
      </span>
    </div>
  );
};
