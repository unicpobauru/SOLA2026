interface Props {
  className?: string;
}

/**
 * Chip con la bandera de Perú y la de Brasil, lado a lado dentro del mismo
 * rectángulo redondeado — no una bandera "híbrida" inventada, sino las dos
 * banderas reales compartiendo una insignia (Perú organiza, Brasil recibe
 * a los becados). Puramente decorativo.
 */
export function FlagBadge({ className }: Props) {
  return (
    <svg viewBox="0 0 48 30" className={className} aria-hidden>
      <defs>
        <clipPath id="flagbadge-clip">
          <rect x="0.5" y="0.5" width="47" height="29" rx="5" />
        </clipPath>
      </defs>
      <g clipPath="url(#flagbadge-clip)">
        {/* Perú: rojo-blanco-rojo */}
        <rect x="0" y="0" width="8" height="30" fill="#D91023" />
        <rect x="8" y="0" width="8" height="30" fill="#ffffff" />
        <rect x="16" y="0" width="8" height="30" fill="#D91023" />
        {/* Brasil: verde + rombo amarillo + círculo azul */}
        <rect x="24" y="0" width="24" height="30" fill="#009739" />
        <polygon points="36,3 46,15 36,27 26,15" fill="#FEDD00" />
        <circle cx="36" cy="15" r="4.4" fill="#2E3192" />
      </g>
      <rect x="0.5" y="0.5" width="47" height="29" rx="5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="24" y1="0" x2="24" y2="30" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
    </svg>
  );
}
