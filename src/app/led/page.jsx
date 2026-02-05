import React from 'react';
import './led-rolls.css';
import {
  listLedRollFamilies,
  getLedRollFilterOptions,
} from '@/lib/supabase/led-roll-sdk';
import LedRollsClient from './LedRollsClient';

// Deshabilitar caché para que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Tiras LED - GSG Iluminación',
  description:
    'Catálogo completo de tiras LED profesionales. COB, SMD y más con diferentes potencias, tonos y protecciones IP.',
};

// Server Component - se ejecuta en el servidor
export default async function LedPage() {
  let families = [];
  let filterOptions = null;

  try {
    // Obtener familias de LED rolls con sus variantes
    const result = await listLedRollFamilies({
      page: 1,
      pageSize: 100,
      includeVariants: true,
    });
    families = result.data;

    // Obtener opciones para filtros
    filterOptions = await getLedRollFilterOptions();
  } catch (error) {
    console.error('Error fetching LED roll families:', error);
  }

  return (
    <div className="led-rolls-page">
      <LedRollsClient
        initialFamilies={families}
        filterOptions={filterOptions}
      />
    </div>
  );
}
