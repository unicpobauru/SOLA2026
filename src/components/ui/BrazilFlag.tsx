interface Props {
  className?: string;
}

/** Bandera de Brasil en una placa redondeada — la beca es para estudiar en Brasil. */
export function BrazilFlag({ className }: Props) {
  return (
    <svg viewBox="0 0 48 30" className={className} aria-hidden>
      <defs>
        <clipPath id="brazilflag-clip">
          <rect x="0.5" y="0.5" width="47" height="29" rx="5" />
        </clipPath>
      </defs>
      <g clipPath="url(#brazilflag-clip)">
        <rect x="0" y="0" width="48" height="30" fill="#009739" />
        <polygon points="24,4 44,15 24,26 4,15" fill="#FEDD00" />
        <circle cx="24" cy="15" r="5.2" fill="#2E3192" />
      </g>
      <rect x="0.5" y="0.5" width="47" height="29" rx="5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    </svg>
  );
}
