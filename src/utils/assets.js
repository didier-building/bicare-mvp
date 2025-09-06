// Shared assets and constants
export const LOGO_URL = "/bicare-logo.png"; // put your PNG in public/bicare-logo.png

export const LOGO_FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
      <rect width='64' height='64' rx='12' fill='#0d9488'/>
      <text x='50%' y='58%' text-anchor='middle' font-family='Inter,Arial' font-size='24' fill='#fff' font-weight='700'>Bi</text>
    </svg>`
  );