import React, { Suspense } from 'react';
import './fuentesSection.css';
import { ProductSkeletonList } from '@/components/ui/ProductSkeleton';
import { listPowerSupplies } from '@/lib/supabase';
import FuentesClient from './FuentesClient';

// Deshabilitar caché para que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FuentesPage() {
  const { data: powerSupplies, total } = await listPowerSupplies();

  return (
    <div className="min-h-screen md:mt-10 lg:mt-24 xl:mt-32">
      <div className="px-4 md:px-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-light text-gray-800">
          Fuentes LED
        </h1>
        <p className="text-gray-500 mt-2">
          Slim / Ultra Slim · 12 V / 24 V — {total}{' '}
          {total === 1 ? 'fuente' : 'fuentes'}
        </p>
      </div>

      <Suspense fallback={<ProductSkeletonList count={6} />}>
        <FuentesClient initialPowerSupplies={powerSupplies} />
      </Suspense>
    </div>
  );
}
