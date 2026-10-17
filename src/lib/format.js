/**
 * Tamaño de archivo legible en español: 1572864 → "1,5 MB"
 * @param {number|null|undefined} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return '';
  const fmt = (n) => n.toLocaleString('es-AR', { maximumFractionDigits: 1 });
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${fmt(bytes / 1024)} KB`;
  return `${fmt(bytes / 1024 / 1024)} MB`;
}
