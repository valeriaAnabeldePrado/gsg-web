'use client';

import { supabase } from '@/lib/supabase/client';
import {
  EVENTS,
  FAMILIES,
  VIEW_DEDUPE_MS,
  CLICK_DEDUPE_MS,
  buildEventRow,
  createDeduper,
  productKey,
} from './analytics-core';

export { EVENTS, FAMILIES };

const shouldSend = createDeduper();

// Producto de la ficha abierta: permite atribuir clics (WhatsApp, documentación) a ese producto
let pageProduct = null;

function send(type, data) {
  if (typeof window === 'undefined') return;
  try {
    const row = buildEventRow(type, data, {
      pathname: window.location.pathname,
      referrer: document.referrer,
      hostname: window.location.hostname,
      now: new Date(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    // Sin await: nunca bloquea navegación, ventanas externas ni descargas
    supabase
      .from('analytics_events')
      .insert(row)
      .then(({ error }) => {
        if (error) console.error('Error enviando métricas:', error);
      })
      .catch((err) => console.error('Error en analytics:', err));
  } catch (err) {
    console.error('Error en analytics:', err);
  }
}

/**
 * Vista de una ficha o página. Ignora repeticiones por re-render dentro de VIEW_DEDUPE_MS.
 */
export function trackView(type, data = {}) {
  const id = data.product ? productKey(data.product.family, data.product.code) : data.metadata?.slug || '';
  const key = `${type}|${id}|${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  if (!shouldSend(key, Date.now(), VIEW_DEDUPE_MS)) return;
  send(type, data);
}

/**
 * Clic en una acción. Con attributeToPage, se asocia al producto de la ficha abierta (si hay).
 */
export function trackClick(type, { metadata = {}, product, attributeToPage = false } = {}) {
  const resolved = product || (attributeToPage ? pageProduct : null);
  const key = `${type}|${metadata.location || ''}|${metadata.target_id || ''}|${resolved ? productKey(resolved.family, resolved.code) : ''}`;
  if (!shouldSend(key, Date.now(), CLICK_DEDUPE_MS)) return;
  send(type, { metadata, product: resolved || undefined });
}

export function setPageProduct(product) {
  pageProduct = product;
}

export function clearPageProduct(product) {
  if (pageProduct && product && productKey(pageProduct.family, pageProduct.code) === productKey(product.family, product.code)) {
    pageProduct = null;
  }
}

/**
 * Compatibilidad con la firma anterior: trackEvent(type, { code, name, category, metadata })
 * @deprecated usar trackView / trackClick
 */
export const trackEvent = async (eventType, data = {}) => {
  const product = data.code ? { family: data.family || FAMILIES.LUMINARIAS, code: data.code, name: data.name, category: data.category } : undefined;
  send(eventType, { product, metadata: data.metadata });
};
