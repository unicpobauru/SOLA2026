/**
 * Formulario propio de registro (sin terceros).
 * Al enviar, hace un POST al Web App de Google Apps Script, que escribe
 * una fila en la Hoja de cálculo de Google — una columna por cada campo
 * de `LeadFormData`, sin claves redundantes (la planilla está armada para
 * este formulario específico).
 *
 * Si GOOGLE_SCRIPT_URL se pone en null, el formulario funciona en la
 * interfaz (muestra "registro recibido") pero NO envía datos a ningún lado.
 */

/** URL de implementación ("Web app") del Google Apps Script — planilla dedicada a SOLA Lima 2026. */
export const GOOGLE_SCRIPT_URL: string | null =
  "https://script.google.com/macros/s/AKfycbxfFLV8e4fIhukMmo3_c-v0j0S6dDV6FjWPMT-TpYr7qCQrheCVbl3rg913HZ8cl24g/exec";

/** Etiqueta fija que viaja en CADA fila (columna "Tag"), fuera del formulario. */
const LEAD_TAG = "[LP-SOLA-2026-PE]";

/** Texto que va a la columna "Origen" de la planilla. */
const ORIGEN = "LP SOLA 2026 Lima";

const TZ = "America/Lima";

export interface LeadFormData {
  nombre: string;
  /** Ya formateado como "(+51) 987 654 321" — sin "+" al inicio (ver nota en logToGoogleSheet). */
  telefono: string;
  /** "Perú (+51)" */
  pais: string;
  correo: string;
  /** "Sí" | "No" */
  odontologo: string;
  /** "Sí" | "No" */
  especialista: string;
  /** Solo si especialista === "Sí"; si no, string vacío. */
  area: string;
  tiempo: string;
  perfil: string;
  /** "Sí" | "No" */
  agenda: string;
  facturacion: string;
}

/** Fecha en formato local (DD-MM-AAAA HH:mm:ss, 24h, zona de Perú). */
function formatFecha(date: Date): string {
  const parts = new Intl.DateTimeFormat("es-PE", {
    timeZone: TZ,
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

/**
 * Envía los datos a la Hoja de cálculo de Google.
 *
 * Va como `application/x-www-form-urlencoded` (no JSON): así los campos
 * caen en `e.parameter` del Apps Script. Ese Content-Type es
 * "CORS-safelisted", por lo que NO dispara preflight.
 *
 * `telefono` viaja como "(+51) 987 654 321" — NO como "+51 987 654 321":
 * un valor que empieza con "+" Google Sheets lo intenta leer como fórmula
 * y la celda queda en #ERROR!.
 */
export function logToGoogleSheet(data: LeadFormData): void {
  if (!GOOGLE_SCRIPT_URL) return;

  const fields: Record<string, string> = {
    fecha: formatFecha(new Date()),
    nombre: data.nombre,
    telefono: data.telefono,
    pais: data.pais,
    correo: data.correo,
    odontologo: data.odontologo,
    especialista: data.especialista,
    area: data.area,
    tiempo: data.tiempo,
    perfil: data.perfil,
    agenda: data.agenda,
    facturacion: data.facturacion,
    origen: ORIGEN,
    tag: LEAD_TAG,
  };

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
