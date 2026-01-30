import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
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
    <div className="relative">
      <button
        type="button" // ✅ prevents form submit
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-6 py-3.5 bg-lightGray/20 border border-lightGray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-content flex items-center justify-between"
      >
        <span>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-content/70" />
      </button>

      {isOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* dropdown */}
          <div
            className="absolute z-20 w-full mt-2 bg-background rounded-xl border border-lightGray/50 shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-6 py-3 hover:bg-lightGray/20 cursor-pointer flex items-center justify-between font-medium"
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
