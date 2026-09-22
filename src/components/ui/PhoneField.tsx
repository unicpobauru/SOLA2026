import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { countries, type Country } from "../../data/countries";

interface Props {
  id?: string;
  /** Solo el número local (sin DDI). */
  value: string;
  onChange: (value: string) => void;
  country: Country;
  onCountryChange: (c: Country) => void;
  placeholder?: string;
}

export function PhoneField({ id, value, onChange, country, onCountryChange, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="flex gap-2">
      <div ref={rootRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-full items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-3 text-[13px] text-white outline-none transition-colors duration-200 hover:border-white/30 focus:border-gold-400/60"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-white/45">{country.code}</span>
          <span className="font-medium">+{country.dial}</span>
          <ChevronDown className={`h-3.5 w-3.5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.5} />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-60 w-64 overflow-auto rounded-xl border border-white/15 bg-[#0b1c40] py-1 shadow-panel"
          >
            {countries.map((c) => {
              const selected = c.code === country.code && c.dial === country.dial;
              return (
                <li key={`${c.code}-${c.dial}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onCountryChange(c);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors hover:bg-white/10"
                  >
                    <span className="w-6 shrink-0 text-[10px] font-bold uppercase text-white/40">{c.code}</span>
                    <span className="w-11 shrink-0 text-white/55">+{c.dial}</span>
                    <span className="flex-1 truncate text-white/85">{c.name}</span>
                    {selected && <Check className="h-3.5 w-3.5 shrink-0 text-brand-300" strokeWidth={3} />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[14px] text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-gold-400/60 focus:bg-white/[0.09]"
        placeholder={placeholder}
      />
    </div>
  );
}
