'use client';

import { useEffect } from 'react';
import { EVENTS, trackView, setPageProduct, clearPageProduct } from '@/lib/analytics';

/**
 * Registra la apertura de una ficha (con sus datos ya disponibles) y la deja como
 * contexto para atribuir los clics de la página a ese producto.
 * @param {{family: string, code: string|number, name?: string, category?: string} | null} product
 */
export function useTrackProductView(product) {
  const family = product?.family;
  const code = product?.code;
  const name = product?.name;
  const category = product?.category;

  useEffect(() => {
    if (!family || code === undefined || code === null || code === '') return;
    const p = { family, code: String(code), name, category };
    setPageProduct(p);
    trackView(EVENTS.VIEW_PRODUCT, { product: p });
    return () => clearPageProduct(p);
  }, [family, code, name, category]);
}
