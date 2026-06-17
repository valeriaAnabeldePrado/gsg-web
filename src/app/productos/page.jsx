import React, { Suspense } from 'react';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import { ProductCard } from '@/components/ui/ProductCard';
import { NoResults } from '@/components/productos/product-no-result';
import { ProductSkeletonList } from '@/components/ui/ProductSkeleton';
import { listProducts, listLedProfiles, getCategories } from '@/lib/supabase';
import ProductsClient from './ProductsClient';

// Deshabilitar caché para que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Server Component - se ejecuta en el servidor
export default async function ProductosPage({ searchParams }) {
  // Esperar a que searchParams se resuelva
  const params = await searchParams;

  // Obtener el parámetro de categoría de la URL
  const categoria = params?.categoria || 'Todos';

  // Determinar el slug de categoría para Supabase
  // Convertir a minúsculas para que coincida con los slugs en la base de datos
  const categorySlug =
    categoria !== 'Todos' ? categoria.toLowerCase() : undefined;

  let products = [];
  let total = 0;

  // Si es "perfiles", traer de led_profiles
  if (categorySlug === 'perfiles') {
    const result = await listLedProfiles({
      page: 1,
      pageSize: 100,
    });
    products = result.data;
    total = result.total;
  }
  // Si es "Todos", traer productos normales Y perfiles
  else if (categoria === 'Todos') {
    const [productsResult, profilesResult] = await Promise.all([
      listProducts({ page: 1, pageSize: 100 }),
      listLedProfiles({ page: 1, pageSize: 100 }),
    ]);
    products = [...productsResult.data, ...profilesResult.data];
    total = productsResult.total + profilesResult.total;
  }
  // Cualquier otra categoría, traer solo productos normales
  else {
    const result = await listProducts({
      page: 1,
      pageSize: 100,
      categorySlug,
    });
    products = result.data;
    total = result.total;
  }

  // Obtener categorías para el futuro (si necesitas filtros)
  const categories = await getCategories();

  return (
    <div className="min-h-screen md:mt-10 lg:mt-24 xl:mt-32">
      <div className="px-4 md:px-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-light text-gray-800">
          {categoria !== 'Todos'
            ? `Productos - ${categoria}`
            : 'Todos los Productos'}
        </h1>
        <p className="text-gray-500 mt-2">
          {total}{' '}
          {total === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </div>

      <Suspense fallback={<ProductSkeletonList count={6} />}>
        <ProductsClient
          key={categoria} // Force re-mount when category changes
          initialProducts={products}
          categoria={categoria}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
