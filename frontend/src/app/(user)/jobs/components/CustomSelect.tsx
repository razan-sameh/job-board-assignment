import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (option: string) => void;
  placeholder: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-3.5 bg-lightGray/20 border border-lightGray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-content hover:bg-lightGray/30 transition-colors flex items-center justify-between"
      >
        <span>{options.find((opt) => opt.value === value)?.label || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-content/70" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-20 w-full mt-2 bg-background rounded-xl border border-lightGray/50 shadow-lg overflow-hidden">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-6 py-3 hover:bg-lightGray/20 transition-colors cursor-pointer flex items-center justify-between text-content font-medium"
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-indigo-600" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
