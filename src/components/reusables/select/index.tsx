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
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  placeholder = "Select an option",
  className,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-[110px] border-gray-300 bg-[#222] font-light text-white outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} className="text-white" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="hover:bg-[#bbb]"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
