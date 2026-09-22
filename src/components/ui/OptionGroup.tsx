interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  /** Columnas de la grilla de opciones. 2 para Sí/No o textos cortos, 1 para textos largos. */
  columns?: 1 | 2;
}

/** Grupo de opciones tipo "chip" — reutilizado en todas las preguntas de selección del formulario. */
export function OptionGroup({ label, options, value, onChange, columns = 2 }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-left text-[12.5px] font-semibold text-white/70">{label}</span>
      <div className={`grid gap-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-xl border px-4 py-2.5 text-center text-[13px] font-semibold leading-snug transition-colors duration-200 ${
              value === opt
                ? "border-gold-400 bg-gold-500 text-white"
                : "border-white/15 bg-white/[0.06] text-white/70 hover:border-white/30"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
