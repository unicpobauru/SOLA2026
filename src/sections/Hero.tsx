import { Check } from "lucide-react";
import { Container } from "../components/ui/Container";
import { LeadForm } from "../components/ui/LeadForm";
import { BrazilFlag } from "../components/ui/BrazilFlag";

const heroPoints = [
  "Nuevos conocimientos, nuevas posibilidades para tu carrera",
  "Sorteo de becas para estudiar en Brasil",
  "Registro rápido y gratis — solo tus datos",
];

/**
 * Capa decorativa heredada de la campaña UniCPO (marca de la Faculdade):
 * marco de marcas de registro, chevrons, cuatrifolio, círculo cian con
 * trama de puntos y líneas punteadas. Puramente estético.
 */
function Decorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {/* marco tipo marcas de imprenta */}
      <div className="absolute inset-3 rounded-[2px] border border-white/15 sm:inset-4" />
      <div className="absolute left-3 top-3 h-4 w-px bg-white/30 sm:left-4 sm:top-4" />
      <div className="absolute left-3 top-3 h-px w-4 bg-white/30 sm:left-4 sm:top-4" />
      <div className="absolute right-3 top-3 h-4 w-px bg-white/30 sm:right-4 sm:top-4" />
      <div className="absolute right-3 top-3 h-px w-4 bg-white/30 sm:right-4 sm:top-4" />
      <div className="absolute bottom-3 left-3 h-4 w-px bg-white/30 sm:bottom-4 sm:left-4" />
      <div className="absolute bottom-3 left-3 h-px w-4 bg-white/30 sm:bottom-4 sm:left-4" />
      <div className="absolute bottom-3 right-3 h-4 w-px bg-white/30 sm:bottom-4 sm:right-4" />
      <div className="absolute bottom-3 right-3 h-px w-4 bg-white/30 sm:bottom-4 sm:right-4" />

      {/* chevrons arriba a la derecha */}
      <svg className="absolute right-8 top-8 h-8 w-24 text-white/60 sm:right-12 sm:top-10" viewBox="0 0 96 32" fill="none">
        {[0, 16, 32, 48, 64].map((x) => (
          <path key={x} d={`M${x} 6 L${x + 12} 16 L${x} 26`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </svg>

      {/* líneas punteadas, borde derecho */}
      <svg className="absolute right-10 top-1/2 hidden h-40 w-4 -translate-y-1/2 text-white/35 lg:block" viewBox="0 0 16 160" fill="currentColor">
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={i}>
            <circle cx={4} cy={i * 10 + 4} r={1.5} />
            <circle cx={12} cy={i * 10 + 4} r={1.5} />
          </g>
        ))}
      </svg>

      {/* círculo cian con trama de puntos + doble chevron */}
      <div className="absolute -bottom-36 -left-36 h-64 w-64 rounded-full bg-brand-400 sm:h-72 sm:w-72">
        <svg className="absolute right-2 top-6 h-24 w-24 text-white/70" viewBox="0 0 96 96" fill="currentColor">
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={8 + c * 13} cy={8 + r * 13} r={2.2} opacity={1 - (r + c) / 16} />
            )),
          )}
        </svg>
        <svg className="absolute right-10 top-1/2 h-10 w-14 -translate-y-1/2 text-white" viewBox="0 0 56 40" fill="none">
          <path d="M6 6 L22 20 L6 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 6 L40 20 L24 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[600px] overflow-hidden bg-ink sm:min-h-[92svh] lg:min-h-[720px]">
      {/* fondo: degradado azul + foto de graduados */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 22% 35%, #1c56b8 0%, #123a86 38%, #0a1f4a 68%, #07173a 100%)",
          }}
        />
        <img
          src="images/hero-people.jpg"
          alt="Graduados de la Faculdade UniCPO celebrando"
          className="absolute right-0 top-0 h-full w-full object-cover object-[72%_20%] opacity-40 sm:w-[62%] sm:opacity-60 lg:w-[54%]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* difuminado de la foto hacia el azul */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0a1f4a 0%, rgba(10,31,74,0.85) 34%, rgba(10,31,74,0.35) 60%, rgba(10,31,74,0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{ background: "linear-gradient(180deg, rgba(7,23,58,0.55) 0%, rgba(7,23,58,0.9) 100%)" }}
        />
      </div>

      <Decorations />

      <Container className="relative z-10 flex min-h-[600px] flex-col justify-center py-24 pt-28 sm:min-h-[92svh] sm:py-28 sm:pt-32 lg:min-h-[720px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* columna de texto */}
          <div className="flex max-w-[600px] flex-col gap-6">
            <div className="flex items-center gap-3">
              <img
                src="images/logo-sola.png"
                alt="XII Cumbre Internacional SOLA Lima 2026"
                className="h-11 w-11 shrink-0 drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] sm:h-12 sm:w-12"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="eyebrow">
                <span className="h-px w-6 bg-brand-400" aria-hidden />
                Faculdade UniCPO · SOLA Lima 2026
              </span>
            </div>
            <h1
              className="text-balance font-extrabold leading-[1.06] tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgba(4,10,30,0.45)]"
              style={{ fontSize: "clamp(1.95rem, 1.35rem + 2.9vw, 3.4rem)" }}
            >
              Inscríbete y participa en el sorteo de{" "}
              <span className="text-brand-300">becas para estudiar en Brasil</span>.
            </h1>

            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-3.5">
              <BrazilFlag className="h-5 w-8 shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/75">
                Beca para estudiar en Brasil
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400 text-ink">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-snug text-white/85 sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-white/45">
              Faculdade UniCPO · XII Cumbre Internacional SOLA · Lima 2026
            </p>
          </div>

          {/* tarjeta de formulario */}
          <div
            id="formulario"
            className="w-full max-w-[440px] scroll-mt-24 justify-self-center rounded-3xl border border-white/12 bg-[#0b1c40]/85 p-6 shadow-panel backdrop-blur-md sm:p-8 lg:justify-self-end"
          >
            <div className="mb-4 flex flex-col gap-1.5 text-center">
              <span className="eyebrow justify-center">
                <span className="h-px w-6 bg-brand-400" aria-hidden />
                Registro
              </span>
              <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
                Participá del sorteo
              </h2>
              <p className="text-[13px] leading-relaxed text-white/65">
                Completá tus datos para entrar en el sorteo de becas.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
