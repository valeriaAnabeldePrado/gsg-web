'use client';

import { useEffect } from 'react';
import { trackView } from '@/lib/analytics';

/**
 * Para páginas renderizadas en el servidor: registra la vista al montarse en el navegador.
 */
export default function TrackView({ event, metadata }) {
  const serialized = JSON.stringify(metadata || {});
  useEffect(() => {
    trackView(event, { metadata: JSON.parse(serialized) });
  }, [event, serialized]);
  return null;
}
