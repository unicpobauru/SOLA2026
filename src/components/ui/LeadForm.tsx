import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { logToGoogleSheet, type LeadFormData } from "../../lib/leadForm";
import { PhoneField } from "./PhoneField";
import { countries, DEFAULT_COUNTRY, type Country } from "../../data/countries";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[14px] text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-gold-400/60 focus:bg-white/[0.09]";
const labelClass = "text-left text-[12.5px] font-semibold text-white/70";

export function LeadForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [country, setCountry] = useState<Country>(
    () => countries.find((c) => c.code === DEFAULT_COUNTRY) ?? countries[0],
  );
  const [email, setEmail] = useState("");
  const [medico, setMedico] = useState<"Sí" | "No" | "">("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nome.trim() || !telefone.trim() || !email.trim() || !medico) {
      setError("Completá todos los campos para continuar.");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Ingresá un correo electrónico válido.");
      return;
    }

    setSubmitting(true);
    const data: LeadFormData = {
      nome: nome.trim(),
      // Formato "(+55) 11 9...": NO empieza con "+", así Google Sheets no lo
      // interpreta como fórmula (eso causaba #ERROR! en la columna Telefone).
      telefone: `(+${country.dial}) ${telefone.trim()}`,
      email: email.trim(),
      medico,
      pais: `${country.name} (+${country.dial})`,
    };
    logToGoogleSheet(data);

    // Sin respuesta legible del Apps Script (no-cors) — mostramos el éxito
    // apenas después de enviar; el registro ya fue disparado a la hoja.
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 600);
  }

  if (done) {
    return (
      <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-gold-400/30 bg-white/[0.05] px-6 py-8 text-center">
        <CheckCircle2 className="h-9 w-9 text-gold-400" strokeWidth={2} />
        <p className="text-[15px] font-bold text-white">¡Ya estás participando!</p>
        <p className="max-w-xs text-[13px] leading-relaxed text-white/65">
          Registramos tus datos para el sorteo de becas. Te contactamos si resultás
          seleccionado/a.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3.5 text-left" noValidate>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="lead-nome">
          Nombre completo
        </label>
        <input
          id="lead-nome"
          type="text"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputClass}
          placeholder="Tu nombre y apellido"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="lead-telefone">
          Teléfono / WhatsApp
        </label>
        <PhoneField
          id="lead-telefone"
          value={telefone}
          onChange={setTelefone}
          country={country}
          onCountryChange={setCountry}
          placeholder="99 123 4567"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="lead-email">
          Correo electrónico
        </label>
        <input
          id="lead-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="tu@correo.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className={labelClass}>¿Sos odontólogo/a?</span>
        <div className="grid grid-cols-2 gap-2">
          {(["Sí", "No"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMedico(option)}
              className={`rounded-xl border px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200 ${
                medico === option
                  ? "border-gold-400 bg-gold-500 text-white"
                  : "border-white/15 bg-white/[0.06] text-white/70 hover:border-white/30"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-[12.5px] font-medium text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-600 disabled:pointer-events-none disabled:opacity-60"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />}
        Quiero participar
      </button>
    </form>
  );
}
