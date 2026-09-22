/**
 * Formulario propio de registro (sin terceros).
 * Al enviar, hace un POST al Web App de Google Apps Script, que escribe
 * una fila en la Hoja de cálculo de Google.
 *
 * Si GOOGLE_SCRIPT_URL se pone en null, el formulario funciona en la
 * interfaz (muestra "registro recibido") pero NO envía datos a ningún lado.
 */

/**
 * URL de implementación ("Web app") del Google Apps Script del cliente.
 * Planilla dedicada a SOLA Lima 2026 (independiente de la de Expodental
 * Ecuador).
 */
export const GOOGLE_SCRIPT_URL: string | null =
  "https://script.google.com/macros/s/AKfycbxfFLV8e4fIhukMmo3_c-v0j0S6dDV6FjWPMT-TpYr7qCQrheCVbl3rg913HZ8cl24g/exec";

/** Etiqueta fija que viaja en CADA fila (columna "Tag"), fuera del formulario. */
const LEAD_TAG = "[LP-SORTEO-BECAS-SOLA-LIMA26]";

/** Texto que va a la columna "Origem" de la planilla. */
const ORIGEN = "LP Sorteo Becas UniCPO · SOLA Lima 2026";

/**
 * Valor por defecto para la columna "País (DDI)".
 * El selector de país del formulario ya manda su propio valor por
 * `data.pais` — este es solo el respaldo si por algún motivo no viene.
 */
const PAIS_DEFAULT = "Perú (+51)";

export interface LeadFormData {
  nome: string;
  telefone: string;
  email: string;
  /** "Sí" | "No" — si la persona es odontóloga. */
  medico: string;
  /** Opcional — país / DDI. Si no viene, se usa PAIS_DEFAULT. */
  pais?: string;
}

/** Fecha en formato local (DD-MM-AAAA HH:mm:ss, 24h, zona de Perú). */
function formatFecha(date: Date): string {
  const parts = new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("day")}-${get("month")}-${get("year")} ${hour}:${get("minute")}:${get("second")}`;
}

/** Asigna `value` a TODAS las claves de `keys` dentro de `target`. */
function put(target: Record<string, string>, keys: string[], value: string): void {
  for (const k of keys) target[k] = value;
}

/**
 * Envía los datos a la Hoja de cálculo de Google.
 *
 * Va como `application/x-www-form-urlencoded` (no JSON): así los campos
 * caen en `e.parameter` del Apps Script. Ese Content-Type es
 * "CORS-safelisted", por lo que NO dispara preflight.
 *
 * Cada valor se manda bajo MUCHAS claves (portugués, español, camelCase y
 * el texto exacto del encabezado) para caer en la columna correcta sea
 * cual sea el nombre de parámetro que espera el script de la planilla.
 */
export function logToGoogleSheet(data: LeadFormData): void {
  if (!GOOGLE_SCRIPT_URL) return;

  const fecha = formatFecha(new Date());
  const pais = data.pais && data.pais.trim() ? data.pais.trim() : PAIS_DEFAULT;
  const fields: Record<string, string> = {};

  // Nome
  put(fields, ["nome", "Nome", "nomeCompleto", "nome_completo", "nombre", "Nombre", "nombreCompleto", "name", "fullName"], data.nome);
  // Telefone / WhatsApp
  put(fields, ["telefone", "Telefone", "celular", "whatsapp", "WhatsApp", "telefono", "Telefono", "phone", "tel"], data.telefone);
  // País (DDI)
  put(fields, ["pais", "Pais", "país", "País", "paisDDI", "País (DDI)", "pais_ddi", "ddi", "DDI", "codigoPais", "countryCode", "country"], pais);
  // E-mail
  put(fields, ["email", "Email", "e-mail", "E-mail", "correo", "mail"], data.email);
  // É odontólogo
  put(fields, ["odontologo", "Odontologo", "ehOdontologo", "eOdontologo", "É odontólogo", "esOdontologo", "dentista", "isDentist"], data.medico);
  // Origem
  put(fields, ["origem", "Origem", "origen", "Origen", "fonte", "source", "canal"], ORIGEN);
  // Data/Hora
  put(fields, ["data", "Data", "dataHora", "Data/Hora", "fecha", "Fecha", "fechaHora", "timestamp", "date"], fecha);
  // Tag (fuera del formulario)
  put(fields, ["tag", "Tag", "etiqueta"], LEAD_TAG);

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    redirect: "follow",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams(fields).toString(),
  }).catch(() => {
    /* silencioso a propósito — la UI de éxito no depende de la respuesta */
  });
}
