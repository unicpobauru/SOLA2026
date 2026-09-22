# LP — Sorteo de becas UniCPO · SOLA Lima 2026

Landing page de una sola pantalla para captar registros al **sorteo de becas para
estudiar en Brasil**, en el marco de la **XII Cumbre Internacional SOLA Lima 2026**
(Faculdade UniCPO). El evento es en Lima, Perú — la beca es únicamente para estudiar
en Brasil. Los datos del formulario se envían a una **Hoja de cálculo de Google** vía
Apps Script.

Stack: React + TypeScript + Tailwind CSS v4 + Vite. Es un **fork temático** de la LP
`EXPODENTAL_ECUADOR` (mismo diseño y mismo formulario) — ver ese repo para el histórico
del diseño original.

## En vivo

- **URL (para el QR):** https://unicpobauru.github.io/SOLA2026/
- Publica desde la rama **`gh-pages`** (contenido de `dist/`). El código fuente está en **`main`**.

## Google Apps Script / planilla

`src/lib/leadForm.ts` apunta a su **propio `GOOGLE_SCRIPT_URL`**, con una Hoja de
cálculo dedicada a SOLA Lima 2026 (ya no comparte planilla con Expodental Ecuador).
El envío sigue funcionando igual que en el sitio original: `POST` `no-cors` con cada
dato mandado bajo varias claves (nombre/nombreCompleto/name, etc.) para caer en la
columna correcta sea cual sea el nombre exacto que espere el script.

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173/SOLA2026/
npm run build      # dist/
npm run preview    # sirve el build localmente
npm run deploy     # build + publica en gh-pages  (GitHub Pages ~1 min en actualizar)
```

## Estructura

`src/App.tsx` monta solo **Header + Hero + Footer**.

- `src/sections/Header.tsx` — logo UniCPO (blanco) fijo arriba.
- `src/sections/Hero.tsx` — degradado azul, capa de decoraciones (`<Decorations/>`:
  marcas de registro, chevrons, círculo cian, puntos), foto de graduados, logo de
  SOLA junto al eyebrow, chip con la bandera de Brasil (`<BrazilFlag/>`, la beca es
  solo para Brasil) y la **tarjeta de formulario** (`id="formulario"`).
- `src/sections/Footer.tsx` — logo UniCPO, logo XII Cumbre SOLA Lima 2026, copyright.
- `src/components/ui/LeadForm.tsx` + `PhoneField.tsx` — nombre, teléfono con selector
  de DDI (país por defecto: **Perú +51**, porque el evento es en Lima — no tiene relación
  con el destino de la beca), correo, ¿odontólogo?
- `src/components/ui/BrazilFlag.tsx` — bandera de Brasil en una placa redondeada.
- `src/lib/leadForm.ts` — **`GOOGLE_SCRIPT_URL`** (planilla propia, ver arriba). Cada
  dato se manda bajo varias claves (nombre/nombreCompleto/name, etc.) para caer en la
  columna correcta sea cual sea el nombre del parámetro que espera el script. Envío
  `no-cors` (la respuesta es opaca; la UI muestra éxito al disparar — confirmar
  igual en la planilla).
- `src/index.css` — paleta azul/cian (`@theme`) y fuente Poppins.

## Imágenes (`public/images/`)

| Archivo | Uso |
|---|---|
| `logo-unicpo.png` | logo blanco de la Faculdade (header y footer) |
| `logo-sola.png` | logo XII Cumbre Internacional SOLA Lima 2026 (Hero y footer) |
| `hero-people.jpg` | foto de graduados, fondo derecho del Hero |

Si una imagen falta, el elemento se oculta y queda el degradado — no rompe la página.

## Pendiente / a revisar

- **Textos legales:** el enlace "Política de Privacidad" del footer apunta a `#`.
- Nota: el repo en GitHub se llama **`SOLA2026`** (no `SOLA_LIMA2026`) — el nombre de la
  carpeta local del proyecto quedó con el nombre original, pero no afecta nada (el `base`
  de `vite.config.ts` y todas las URLs ya apuntan a `SOLA2026`).
