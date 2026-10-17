/**
 * Contrato de eventos de analytics (lógica pura, sin navegador).
 * Documentación: docs/analytics-events.md
 */

export const SCHEMA_VERSION = 2;

export const EVENTS = {
  VIEW_PRODUCT: 'view_product',
  WHATSAPP_WIDGET_OPEN: 'whatsapp_widget_open',
  WHATSAPP_CLICK: 'whatsapp_click',
  DOCUMENT_CLICK: 'document_click',
  CATALOG_CLICK: 'catalog_click',
  DISTRIBUTOR_CONTACT_CLICK: 'distributor_contact_click',
  VIEW_DOWNLOAD_PAGE: 'view_download_page',
};

// Familias del catálogo con ficha propia. Los eventos históricos sin familia son luminarias.
export const FAMILIES = {
  LUMINARIAS: 'luminarias',
  PERFILES: 'perfiles',
  ROLLOS: 'rollos',
  ACCESORIOS: 'accesorios',
  FUENTES: 'fuentes',
};

// Ventanas anti-duplicado: re-renders y doble efecto de React, doble clic
export const VIEW_DEDUPE_MS = 2000;
export const CLICK_DEDUPE_MS = 700;

const MAX_PATH = 200;

/**
 * production solo en el dominio real; el resto se excluye de los reportes
 */
export function environmentForHost(hostname) {
  const host = (hostname || '').toLowerCase();
  if (host === 'gsgdesign.com.ar' || host.endsWith('.gsgdesign.com.ar')) return 'production';
  if (!host || host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host.endsWith('.local')) {
    return 'development';
  }
  return 'preview';
}

/**
 * Solo el origen: nunca la URL completa con parámetros
 */
export function referrerOrigin(referrer) {
  if (!referrer) return '';
  try {
    const url = new URL(referrer);
    if (url.origin && url.origin !== 'null') return url.origin;
    // esquemas como android-app:// no tienen origin
    return `${url.protocol}//${url.host}`;
  } catch {
    return '';
  }
}

export function sanitizePath(pathname) {
  const path = (pathname || '').split(/[?#]/)[0] || '/';
  return path.slice(0, MAX_PATH);
}

export function productKey(family, code) {
  return `${family}:${code}`;
}

/**
 * Identificador estable de un archivo a partir de su URL (nombre del archivo en R2)
 */
export function fileIdFromPath(path) {
  if (!path) return '';
  return path.split(/[?#]/)[0].split('/').pop() || '';
}

/**
 * Arma la fila para analytics_events.
 * @param {string} type - uno de EVENTS
 * @param {{ product?: {family: string, code: string, name?: string, category?: string}, metadata?: object }} data
 * @param {{ pathname: string, referrer: string, hostname: string, now: Date, timezone?: string }} ctx
 */
export function buildEventRow(type, data, ctx) {
  const product = data?.product || null;
  const base = {
    v: SCHEMA_VERSION,
    env: environmentForHost(ctx.hostname),
    path: sanitizePath(ctx.pathname),
    referrer: referrerOrigin(ctx.referrer),
    viewedAt: ctx.now.toISOString(),
    timezone: ctx.timezone || '',
  };
  const productMeta = product
    ? { family: product.family, product_key: productKey(product.family, product.code) }
    : {};

  return {
    event_type: type,
    product_code: product ? String(product.code) : null,
    product_name: product?.name || null,
    category: product?.category || null,
    // Los campos base van al final para que la metadata del evento no los pise
    metadata: { ...(data?.metadata || {}), ...base, ...productMeta },
  };
}

/**
 * Devuelve shouldSend(key, now, windowMs): false si el mismo key se envió hace menos de windowMs
 */
export function createDeduper() {
  const last = new Map();
  return (key, now, windowMs) => {
    const prev = last.get(key);
    if (prev !== undefined && now - prev < windowMs) return false;
    last.set(key, now);
    return true;
  };
}
