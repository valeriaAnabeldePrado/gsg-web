import { notFound } from 'next/navigation';
import { getPowerSupplyByCode } from '@/lib/supabase';
import PowerSupplyDetailClient from './PowerSupplyDetailClient';

// Deshabilitar caché
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { code } = await params;
  const ps = await getPowerSupplyByCode(code);
  if (!ps) return { title: 'Fuente no encontrada' };
  return {
    title: ps.name,
    description: ps.description || `Fuente LED ${ps.series || ''} ${ps.powerW ?? ''}W`.trim(),
  };
}

export default async function PowerSupplyDetailPage({ params }) {
  const { code } = await params;
  const powerSupply = await getPowerSupplyByCode(code);

  if (!powerSupply) {
    notFound();
  }

  return <PowerSupplyDetailClient powerSupply={powerSupply} />;
}
