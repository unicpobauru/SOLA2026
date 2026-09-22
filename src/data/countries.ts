export interface Country {
  /** ISO-2 code, shown as a small badge (EC, BR, …) */
  code: string;
  /** International dial code, sin el "+" */
  dial: string;
  name: string;
}

/** Código por defecto (evento en Perú). */
export const DEFAULT_COUNTRY = "PE";

/** Perú primero; el resto en orden alfabético por nombre. */
export const countries: Country[] = [
  { code: "PE", dial: "51", name: "Perú" },
  { code: "AR", dial: "54", name: "Argentina" },
  { code: "BO", dial: "591", name: "Bolivia" },
  { code: "BR", dial: "55", name: "Brasil" },
  { code: "CL", dial: "56", name: "Chile" },
  { code: "CO", dial: "57", name: "Colombia" },
  { code: "CR", dial: "506", name: "Costa Rica" },
  { code: "CU", dial: "53", name: "Cuba" },
  { code: "EC", dial: "593", name: "Ecuador" },
  { code: "SV", dial: "503", name: "El Salvador" },
  { code: "ES", dial: "34", name: "España" },
  { code: "US", dial: "1", name: "Estados Unidos" },
  { code: "GT", dial: "502", name: "Guatemala" },
  { code: "HN", dial: "504", name: "Honduras" },
  { code: "MX", dial: "52", name: "México" },
  { code: "NI", dial: "505", name: "Nicaragua" },
  { code: "PA", dial: "507", name: "Panamá" },
  { code: "PY", dial: "595", name: "Paraguay" },
  { code: "PT", dial: "351", name: "Portugal" },
  { code: "PR", dial: "1", name: "Puerto Rico" },
  { code: "DO", dial: "1", name: "Rep. Dominicana" },
  { code: "UY", dial: "598", name: "Uruguay" },
  { code: "VE", dial: "58", name: "Venezuela" },
];
