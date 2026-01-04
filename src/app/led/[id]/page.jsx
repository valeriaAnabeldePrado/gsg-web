import Image from 'next/image';
import {
  getLedRollFamilyById,
  getFamilyCoverImage,
  formatVariantDisplay,
} from '@/lib/supabase/led-roll-sdk';
import { notFound } from 'next/navigation';
import LedDetailClient from './LedDetailClient';

// Deshabilitar caché para que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Server Component - se ejecuta en el servidor
export default async function LedDetailPage({ params }) {
  const { id } = await params;

  let family = null;

  try {
    // Obtener la familia de LED roll por ID desde Supabase
    family = await getLedRollFamilyById(parseInt(id));

    if (!family) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching LED roll family:', error);
    notFound();
  }

  return <LedDetailClient family={family} />;
}
