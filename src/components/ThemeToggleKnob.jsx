// The moon/sun knob markup inside every theme-toggle button (desktop,
// mobile bar, mobile menu). Identical in all three legacy call sites
// (L989-1000, L1033-1044, L2907ish) — factored out to avoid tripling it.
export function ThemeToggleKnob() {
  return (
    <span className="knob">
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.9 14.2A8.4 8.4 0 1 1 9.8 3.1a6.8 6.8 0 0 0 11.1 11.1Z" fill="currentColor" />
      </svg>
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.3" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2.6v2.3M12 19.1v2.3M4.2 12H1.9M22.1 12h-2.3M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
        </g>
      </svg>
    </span>
  )
}

export default ThemeToggleKnob
