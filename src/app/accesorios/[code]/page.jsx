import { notFound } from 'next/navigation';
import { getAccessoryByCode } from '@/lib/supabase';
import AccessoryDetailClient from './AccessoryDetailClient';

// Deshabilitar caché
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AccessoryDetailPage({ params }) {
  const { code } = await params;

  // Buscar accesorio por código
  const accessory = await getAccessoryByCode(code);

  // Si no existe, mostrar 404
  if (!accessory) {
    notFound();
  }

  return <AccessoryDetailClient accessory={accessory} />;
}
