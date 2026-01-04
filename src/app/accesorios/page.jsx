import React, { Suspense } from 'react';
import './accSection.css';
import { ProductSkeletonList } from '@/components/ui/ProductSkeleton';
import { listAccessories } from '@/lib/supabase';
import AccessoriesClient from './AccessoriesClient';

// Deshabilitar caché para que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Server Component
export default async function AccesoriosPage() {
  // Traer todos los accesorios
  const { data: accessories, total } = await listAccessories({
    page: 1,
    pageSize: 100,
  });

  return (
    <div className="min-h-screen md:mt-10 lg:mt-24 xl:mt-32">
      <div className="px-4 md:px-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-light text-gray-800">
          Accesorios
        </h1>
        <p className="text-gray-500 mt-2">
          {total} {total === 1 ? 'accesorio encontrado' : 'accesorios encontrados'}
        </p>
      </div>

      <Suspense fallback={<ProductSkeletonList count={6} />}>
        <AccessoriesClient initialAccessories={accessories} />
      </Suspense>
    </div>
  );
}
