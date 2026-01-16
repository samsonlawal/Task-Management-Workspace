import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  color?: string;
  className?: string;
  onClick?: () => void;
  leftIcon?: boolean;
  leftIconSrc?: string | React.ReactNode;
  rightIcon?: boolean;
  rightIconSrc?: string | React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "blue",
  className,
  onClick,
  leftIcon,
  leftIconSrc,
  rightIcon,
  rightIconSrc,
}) => {
  return (
    <button
      className={cn(
        "font-normal text-white transition-all duration-300",
        `bg-${color}-500 hover:bg-${color}-600`,
        className,
      )}
      onClick={onClick}
    >
      {leftIcon && typeof leftIconSrc === "string" ? (
        <img src={leftIconSrc} alt="" className="w-4" />
      ) : (
        leftIconSrc
      )}
      {text}
      {rightIcon && typeof rightIconSrc === "string" ? (
        <img src={rightIconSrc} alt="" className="w-4" />
      ) : (
        rightIconSrc
      )}
    </button>
  );
};

export default Button;
