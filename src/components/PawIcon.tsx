export function PawIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="paw-icon"
    >
      <ellipse cx="12" cy="16" rx="6" ry="5" />
      <ellipse cx="5.5" cy="9" rx="2.4" ry="3" />
      <ellipse cx="18.5" cy="9" rx="2.4" ry="3" />
      <ellipse cx="9" cy="5" rx="2.1" ry="2.8" />
      <ellipse cx="15" cy="5" rx="2.1" ry="2.8" />
    </svg>
  );
}
