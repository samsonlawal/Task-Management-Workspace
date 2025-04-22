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
      <Select onValueChange={onChange} onOpenChange={handleOpenChange}>
        <SelectTrigger
          className={cn(
            "w-[110px] border-gray-300 bg-gray-200 font-light text-black outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            className,
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
          className="bg-white"
          // We do need some event prevention to avoid closing parent dialog
          onPointerDownOutside={(e) => {
            if (isSelectOpen) {
              e.preventDefault();
            }
          }}
        >
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="hover:bg-gray-200"
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
