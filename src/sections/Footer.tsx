import { PenLine } from "lucide-react";
import { Container } from "../components/ui/Container";
import { FORM_HREF } from "../lib/cta";

const SOCIALS = [
  {
    label: "Instagram de UniCPO",
    href: "https://www.instagram.com/unicpo.oficial/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok de UniCPO",
    href: "https://www.tiktok.com/@unicpo.oficial",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden fill="currentColor">
        <path d="M16.5 3c.3 2 1.5 3.7 3.5 4.1v3.1c-1.3.1-2.6-.2-3.8-.9v6.2c0 3.9-3.2 6.8-7 6.3-2.9-.4-5.1-2.9-5.2-5.8-.1-3.4 2.6-6.2 6-6.2.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.7 0-3 1.5-2.8 3.2.2 1.4 1.4 2.5 2.8 2.5 1.6 0 2.9-1.3 2.9-2.9V3h3.6Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      className="pt-12 text-white/70"
      style={{
        background:
          "radial-gradient(120% 160% at 50% 0%, #1c56b8 0%, #123a86 34%, #0a1f4a 68%, #07173a 100%)",
      }}
    >
      <Container>
        <div className="flex flex-col items-center gap-5 border-b border-white/10 pb-10 text-center">
          <div className="flex items-center justify-center gap-5">
            <img src="images/logo-unicpo.png" alt="Faculdade UniCPO" className="h-10 w-auto sm:h-11" />
            <span className="h-10 w-px shrink-0 bg-white/15 sm:h-11" aria-hidden />
            <img
              src="images/logo-sola.png"
              alt="XII Cumbre Internacional SOLA Lima 2026"
              className="h-14 w-auto sm:h-16"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <p className="max-w-[440px] text-[13.5px] leading-relaxed text-white/55">
            El conocimiento que transforma tu carrera. Formación especializada, experiencia
            práctica y docentes que inspiran nuevas posibilidades.
          </p>
          <a
            href={FORM_HREF}
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-300 transition-colors hover:text-brand-200"
          >
            <PenLine className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            Quiero participar del sorteo
          </a>

          <div className="mt-3 flex flex-col items-center gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Seguí a UniCPO
            </span>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center text-[12px] text-white/40 sm:flex-row sm:text-left">
          <p>Faculdade UniCPO · SOLA Lima 2026 — Copyright {new Date().getFullYear()}. Todos los derechos reservados.</p>
          <a href="#" className="underline-offset-4 hover:underline">Política de Privacidad</a>
        </div>
      </Container>
    </footer>
  );
}
