/** Google Maps-inbäddning utan API-nyckel — klarar bara en plats (en nål) per karta. */
export const mapEmbedSrc = (query: string, zoom?: number) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}${zoom ? `&z=${zoom}` : ""}&output=embed`;
