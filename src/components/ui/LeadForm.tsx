import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { logToGoogleSheet, type LeadFormData } from "../../lib/leadForm";
import { PhoneField } from "./PhoneField";
import { OptionGroup } from "./OptionGroup";
import { countries, DEFAULT_COUNTRY, type Country } from "../../data/countries";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIEMPO_OPTIONS = ["Hasta 2 años", "De 3 a 5 años", "De 6 a 10 años", "Más de 10 años"];
const PERFIL_OPTIONS = [
  "Tengo mi propio consultorio",
  "Trabajo para terceros",
  "Trabajo en el sector público",
];
const FACTURACION_OPTIONS = [
  "Hasta US$ 5.000 al mes",
  "Entre US$ 5.000 y US$ 10.000 al mes",
  "Entre US$ 10.000 y US$ 20.000 al mes",
  "Más de US$ 20.000 al mes",
];

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[14px] text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-gold-400/60 focus:bg-white/[0.09]";
const labelClass = "text-left text-[12.5px] font-semibold text-white/70";

export function LeadForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [country, setCountry] = useState<Country>(
    () => countries.find((c) => c.code === DEFAULT_COUNTRY) ?? countries[0],
  );
  const [correo, setCorreo] = useState("");
  const [odontologo, setOdontologo] = useState("");
  const [especialista, setEspecialista] = useState("");
  const [area, setArea] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [perfil, setPerfil] = useState("");
  const [agenda, setAgenda] = useState("");
  const [facturacion, setFacturacion] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !nombre.trim() ||
      !telefono.trim() ||
      !correo.trim() ||
      !odontologo ||
      !especialista ||
      !tiempo ||
      !perfil ||
      !agenda ||
      !facturacion
    ) {
      setError("Completa todos los campos para continuar.");
      return;
    }
    if (!EMAIL_PATTERN.test(correo.trim())) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    if (especialista === "Sí" && !area.trim()) {
      setError("Indica en qué área eres especialista.");
      return;
    }

    setSubmitting(true);
    const data: LeadFormData = {
      nombre: nombre.trim(),
      // Formato "(+51) 987...": NO empieza con "+", así Google Sheets no lo
      // interpreta como fórmula (eso causaba #ERROR! en la columna Teléfono).
      telefono: `(+${country.dial}) ${telefono.trim()}`,
      pais: `${country.name} (+${country.dial})`,
      correo: correo.trim(),
      odontologo,
      especialista,
      area: especialista === "Sí" ? area.trim() : "",
      tiempo,
      perfil,
      agenda,
      facturacion,
    };
    logToGoogleSheet(data);

    // Evento "Lead" para el Pixel de Meta, solo si hay uno instalado en la página.
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "Lead", { content_name: "LP SOLA 2026 Lima" });

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
          Registramos tus datos. Te contactaremos muy pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3.5 text-left" noValidate>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="lead-nombre">
          Nombre completo
        </label>
        <input
          id="lead-nombre"
          type="text"
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputClass}
          placeholder="Tu nombre y apellido"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="lead-telefono">
          Teléfono / WhatsApp
        </label>
        <PhoneField
          id="lead-telefono"
          value={telefono}
          onChange={setTelefono}
          country={country}
          onCountryChange={setCountry}
          placeholder="987 654 321"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="lead-correo">
          Correo electrónico
        </label>
        <input
          id="lead-correo"
          type="email"
          autoComplete="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={inputClass}
          placeholder="tu@correo.com"
        />
      </div>

      <OptionGroup label="¿Eres odontólogo/a?" options={["Sí", "No"]} value={odontologo} onChange={setOdontologo} columns={2} />

      <OptionGroup
        label="¿Ya eres especialista en alguna área de la odontología?"
        options={["Sí", "No"]}
        value={especialista}
        onChange={setEspecialista}
        columns={2}
      />

      {especialista === "Sí" && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="lead-area">
            Si respondiste sí, ¿en qué área?
          </label>
          <input
            id="lead-area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={inputClass}
            placeholder="Ej.: Ortodoncia, Implantología, Endodoncia..."
          />
        </div>
      )}

      <OptionGroup
        label="¿Cuánto tiempo llevas trabajando en odontología?"
        options={TIEMPO_OPTIONS}
        value={tiempo}
        onChange={setTiempo}
        columns={2}
      />

      <OptionGroup
        label="Selecciona la alternativa que mejor te representa:"
        options={PERFIL_OPTIONS}
        value={perfil}
        onChange={setPerfil}
        columns={1}
      />

      <OptionGroup
        label="¿Ya utilizas algún sistema de gestión de agenda en tu clínica?"
        options={["Sí", "No"]}
        value={agenda}
        onChange={setAgenda}
        columns={2}
      />

      <OptionGroup
        label="¿Cuál es el rango de facturación mensual de tu clínica?"
        options={FACTURACION_OPTIONS}
        value={facturacion}
        onChange={setFacturacion}
        columns={1}
      />

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
