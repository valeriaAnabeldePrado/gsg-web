'use client';

import { supabase } from '@/lib/supabase/client';

export const trackEvent = async (eventType, data = {}) => {
  try {
    const { error } = await supabase.from('analytics_events').insert({
      event_type: eventType,
      product_code: data.code || null,
      product_name: data.name || null,
      category: data.category || null,
      metadata: {
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
        ...data.metadata,
      },
    });

    if (error) {
      console.error('Error enviando métricas:', error);
    }
  } catch (err) {
    console.error('Error en analytics:', err);
  }
};
