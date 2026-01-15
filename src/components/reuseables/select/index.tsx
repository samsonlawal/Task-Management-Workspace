import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  label?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  value?: string; // <-- Add this
  onChange?: (value: string) => void;
  onClick?: any;
  onOpenChange?: (open: boolean) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  placeholder = "Select an option",
  className,
  onChange,
  onClick,
  onOpenChange,
  value,
}) => {
  // Keep track of the select state internally
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);

  // Handle open change with internal state
  const handleOpenChange = (open: boolean) => {
    setIsSelectOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Select
        value={value}
        onValueChange={onChange}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger
          className={cn(
            className,
            `flex h-[36px] cursor-pointer flex-row items-center gap-3 rounded-[6px] border-[1.7px] border-[#565656]/20 px-3 py-1 text-[12px] font-medium text-[#111] transition-all duration-300 hover:bg-[#565656]/10 active:scale-95 dark:text-[#565656]`,
          )}
          onClick={(e) => {
            // Stop propagation to prevent parent dialog from closing
            e.stopPropagation();

            // If you also have a custom onClick handler
            if (onClick) onClick(e);
          }}
        >
          <SelectValue placeholder={placeholder} className="text-white" />
        </SelectTrigger>
        <SelectContent
          className="border-[1.7px] border-[#565656]/20 bg-white dark:border-[#111] dark:bg-[#565656]/20"
          // We do need some event prevention to avoid closing parent dialog
          onPointerDownOutside={(e) => {
            if (isSelectOpen) {
              e.preventDefault();
            }
          }}
        >
          <SelectGroup>
            {label && (
              <SelectLabel className="dark:text-[#565656] dark:hover:bg-[#565656]/20">
                {label}
              </SelectLabel>
            )}
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="hover:bg-[#565656]/20"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
