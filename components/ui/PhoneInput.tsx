"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, defaultCountry = "IN", ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={`flex w-full ${className || ""}`}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          limitMaxLength={true}
          defaultCountry={defaultCountry}
          value={value || undefined}
          onChange={(val) => onChange?.(val || ("" as RPNInput.Value))}
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, onChange, onKeyDown, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    if (digits.length > 10) {
      e.target.value = digits.slice(0, 10);
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only allow up to 10 digits
    const isDigit = /^[0-9]$/.test(e.key);
    if (isDigit) {
      const target = e.currentTarget;
      const digits = target.value.replace(/\D/g, "");
      const hasSelection =
        (target.selectionEnd ?? 0) - (target.selectionStart ?? 0) > 0;
      if (digits.length >= 10 && !hasSelection) {
        e.preventDefault();
        return;
      }
    }
    onKeyDown?.(e);
  };

  return (
    <input
      type="tel"
      inputMode="numeric"
      maxLength={14}
      className={`rounded-r-xl rounded-l-none border border-[#E7EAEE] bg-white px-3.5 py-3 text-[14px] font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15 transition-all shadow-2xs w-full ${className || ""}`}
      {...props}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={ref}
    />
  );
});
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const filteredCountries = React.useMemo(() => {
    return countryList.filter(({ value, label }) => {
      if (!value) return false;
      const cleanSearch = searchValue.toLowerCase().trim();
      const code = RPNInput.getCountryCallingCode(value);
      return (
        label.toLowerCase().includes(cleanSearch) ||
        value.toLowerCase().includes(cleanSearch) ||
        code.includes(cleanSearch)
      );
    });
  }, [countryList, searchValue]);

  return (
    <div ref={containerRef} className="relative flex-none">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-l-xl rounded-r-none border border-[#E7EAEE] border-r-0 bg-[#F8FAFC] px-3.5 py-3 text-[13px] font-semibold text-[#10151C] hover:bg-[#F4F6FA] transition-colors focus:z-10 focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/15 h-full cursor-pointer"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select country dial code"
      >
        <FlagComponent
          country={selectedCountry}
          countryName={selectedCountry}
        />
        <ChevronsUpDown
          className={`size-3.5 text-[#8892A0] ${disabled ? "hidden" : "opacity-100"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-[290px] bg-white rounded-xl border border-[#E7EAEE] shadow-[0_16px_40px_rgba(0,38,106,0.14)] z-50 overflow-hidden flex flex-col animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Search Input */}
          <div className="p-2.5 border-b border-[#E7EAEE] bg-[#F8FAFC]">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search country or code..."
              className="w-full rounded-lg border border-[#E7EAEE] bg-white px-3 py-1.5 text-xs font-medium text-[#10151C] placeholder-[#8892A0] focus:outline-none focus:border-[#00266A] focus:ring-1 focus:ring-[#00266A]/20 transition-all"
              autoFocus
            />
          </div>

          {/* List Area */}
          <div className="max-h-60 overflow-y-auto py-1 divide-y divide-[#E7EAEE]/40">
            {filteredCountries.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-[#8892A0] font-medium">
                No matching country found.
              </div>
            ) : (
              filteredCountries.map(({ value, label }) => {
                if (!value) return null;
                const isSelected = value === selectedCountry;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      onChange(value);
                      setIsOpen(false);
                      setSearchValue("");
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left text-xs font-medium text-[#10151C] hover:bg-[#F4F6FA] transition-colors cursor-pointer ${
                      isSelected ? "bg-[#00266A]/5 font-semibold text-[#00266A]" : ""
                    }`}
                  >
                    <FlagComponent country={value} countryName={label} />
                    <span className="flex-1 truncate text-[#10151C]">{label}</span>
                    <span className="text-[#8892A0] font-semibold text-[11.5px]">{`+${RPNInput.getCountryCallingCode(value)}`}</span>
                    {isSelected && <Check className="size-3.5 text-[#00266A] shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-3.5 w-5.5 overflow-hidden rounded-xs bg-[#E7EAEE]/50 border border-black/10 flex-shrink-0">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
