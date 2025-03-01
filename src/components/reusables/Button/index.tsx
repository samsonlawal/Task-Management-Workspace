import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "blue",
  className,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "rounded px-4 py-2 font-medium text-white transition-all",
        `bg-${color}-500 hover:bg-${color}-600`,
        className,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
