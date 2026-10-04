/** Iconos authorizados en un solo trazo consistente (1.6px, redondeado). */

type Props = { className?: string };

const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconoWhatsApp({ className }: Props) {
  return (
    <svg
      viewBox="0 0 448 512"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

export function IconoCarrito({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M3 4.5h2.2l2.3 10.6a1.6 1.6 0 0 0 1.6 1.3h7.6a1.6 1.6 0 0 0 1.6-1.2L20 8.2H6" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </svg>
  );
}

export function IconoCheck({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function IconoHoja({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M9.5 9.5v10M3.5 14.5h17" />
    </svg>
  );
}

export function IconoColores({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoAuricular({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M4 13.5v-1.5a8 8 0 0 1 16 0V13.5" />
      <rect x="3" y="13" width="4.2" height="6.5" rx="2.1" />
      <rect x="16.8" y="13" width="4.2" height="6.5" rx="2.1" />
    </svg>
  );
}

export function IconoPorcentaje({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M19 5L5 19" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}

export function IconoEnlace({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M10.5 13.5a4.5 4.5 0 0 0 6.36l2.5-2.5a4.5 4.5 0 1 0-6.36-6.36l-1.3 1.3" />
      <path d="M13.5 10.5a4.5 4.5 0 0 0-6.36 0l-2.5 2.5a4.5 4.5 0 1 0 6.36 6.36l1.3-1.3" />
    </svg>
  );
}

export function IconoMas({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconoFlechaAbajo({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      <path d="M12 5v13M6.5 12.5L12 18.5l5.5-6" />
    </svg>
  );
}
