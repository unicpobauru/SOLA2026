# LP — Sorteo de becas UniCPO · SOLA Lima 2026

Landing page de una sola pantalla para captar registros al **sorteo de becas para
estudiar en Brasil y Perú**, en el marco de la **XII Cumbre Internacional SOLA Lima 2026**
(Faculdade UniCPO). Los datos del formulario se envían a una **Hoja de cálculo de Google**
vía Apps Script.

Stack: React + TypeScript + Tailwind CSS v4 + Vite. Es un **fork temático** de la LP
`EXPODENTAL_ECUADOR` (mismo diseño y mismo formulario) — ver ese repo para el histórico
del diseño original.

## En vivo

- **URL (para el QR):** https://unicpobauru.github.io/SOLA_LIMA2026/
- Publica desde la rama **`gh-pages`** (contenido de `dist/`). El código fuente está en **`main`**.

## ⚠️ Importante: mismo Google Apps Script que Expodental Ecuador

`src/lib/leadForm.ts` apunta al **mismo `GOOGLE_SCRIPT_URL`** (misma Hoja de cálculo) que
la LP de Expodental Ecuador — se mantuvo así a propósito ("el formulario sigue igual").
Los registros de ambas campañas van a **la misma planilla**, diferenciados por la columna
`Tag` (`[LP-SORTEO-BECAS-SOLA-LIMA26]` acá vs. `[LP-SORTEO-BECAS-EC]` en Ecuador) y por
`Origem`. Si preferís una planilla o pestaña separada para SOLA Lima 2026, pasame la URL
del nuevo Apps Script y la cambio en un minuto.

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173/SOLA_LIMA2026/
npm run build      # dist/
npm run preview    # sirve el build localmente
npm run deploy     # build + publica en gh-pages  (GitHub Pages ~1 min en actualizar)
```

## Estructura

`src/App.tsx` monta solo **Header + Hero + Footer**.

- `src/sections/Header.tsx` — logo UniCPO (blanco) fijo arriba.
- `src/sections/Hero.tsx` — degradado azul, capa de decoraciones (`<Decorations/>`:
  marcas de registro, chevrons, círculo cian, puntos), foto de graduados, logo de
  SOLA junto al eyebrow, chip de banderas Perú + Brasil (`<FlagBadge/>`) y la
  **tarjeta de formulario** (`id="formulario"`).
- `src/sections/Footer.tsx` — logo UniCPO, logo XII Cumbre SOLA Lima 2026, copyright.
- `src/components/ui/LeadForm.tsx` + `PhoneField.tsx` — nombre, teléfono con selector
  de DDI (país por defecto: **Perú +51**), correo, ¿odontólogo?
- `src/components/ui/FlagBadge.tsx` — insignia con la bandera de Perú y la de Brasil
  lado a lado (no una bandera inventada — las dos reales en una misma placa).
- `src/lib/leadForm.ts` — **`GOOGLE_SCRIPT_URL`** (ver aviso arriba). Cada dato se manda
  bajo varias claves (nombre/nombreCompleto/name, etc.) para caer en la columna correcta
  sea cual sea el nombre del parámetro que espera el script. Envío `no-cors` (la respuesta
  es opaca; la UI muestra éxito al disparar).
- `src/index.css` — paleta azul/cian (`@theme`) y fuente Poppins.

## Imágenes (`public/images/`)

| Archivo | Uso |
|---|---|
| `logo-unicpo.png` | logo blanco de la Faculdade (header y footer) |
| `logo-sola.png` | logo XII Cumbre Internacional SOLA Lima 2026 (Hero y footer) |
| `hero-people.jpg` | foto de graduados, fondo derecho del Hero |

Si una imagen falta, el elemento se oculta y queda el degradado — no rompe la página.

## Pendiente / a revisar

- **Crear el repo `SOLA_LIMA2026` en GitHub** (owner `unicpobauru`, vacío, público) antes
  del primer `git push` / `npm run deploy` — a diferencia de Expodental Ecuador, este repo
  todavía no existía.
- **Confirmar si la planilla debe ser la misma o una nueva** (ver aviso arriba).
- Hacer un registro de prueba y confirmar en qué columnas cayó cada campo.
- **Textos legales:** el enlace "Política de Privacidad" del footer apunta a `#`.
