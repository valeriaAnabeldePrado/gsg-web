'use client';
import React, { useEffect, useState, useMemo, Suspense } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import Filtering from '@/components/productos/filter';
import { ProductCard } from '@/components/productos/product-card';
import { NoResults } from '@/components/productos/product-no-result';
import { ProductSkeletonList } from '@/components/productos/product-skeleton';

const Productos = () => (
  <Suspense fallback={<LoaderP />}>
    <ProductosInner />
  </Suspense>
);

export default Productos;

// --- Componente contenido ---
const ProductosInner = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [filters, setFilters] = useState({
    search: '',
    categoria: searchParams.get('categoria') || 'Todos',
    color: 'Todos',
    acabado: 'Todos',
    incluyeEquipo: false,
  });

  const buildQuery = (currentFilters) => {
    const params = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value && value !== 'Todos' && value !== false && value !== '') {
        params.append(key, value.toString());
      }
    });
    return params.toString();
  };

  const fetchProducts = async (activeFilters) => {
    try {
      setLoading(true);
      const query = buildQuery(activeFilters);
      const url = query ? `/api/filter?${query}` : '/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlCategoria = searchParams.get('categoria');
    if (urlCategoria && urlCategoria !== filters.categoria) {
      setFilters((prev) => ({ ...prev, categoria: urlCategoria }));
    }
  }, [searchParams, filters.categoria]);

  useEffect(() => {
    fetchProducts(filters);
  }, [
    filters.categoria,
    filters.color,
    filters.acabado,
    filters.incluyeEquipo,
  ]);

  const filteredProducts = useMemo(() => {
    if (!filters.search) return products;

    const searchTerm = filters.search.toLowerCase();
    return products.filter((product) => {
      const nameMatch = product.nombre?.toLowerCase().includes(searchTerm);
      const modelMatch = product.modelos?.some((modelo) =>
        modelo.subnombre?.toLowerCase().includes(searchTerm),
      );
      return nameMatch || modelMatch;
    });
  }, [filters.search, products]);

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const getCategoryTitle = () => {
    if (filters.categoria && filters.categoria !== 'Todos') {
      return `Productos - ${filters.categoria}`;
    }
    return 'Todos los Productos';
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 md:px-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
          {getCategoryTitle()}
        </h1>
      </div>

      <div className="px-4 md:px-10 mt-16 mb-4">
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      <div className="px-4 md:px-10 mb-8">
        <Filtering filters={filters} onChange={handleFiltersChange} />
      </div>

      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          {loading ? (
            <ProductSkeletonList count={6} />
          ) : filteredProducts.length === 0 ? (
            <NoResults
              onReset={() =>
                setFilters({
                  search: '',
                  categoria: 'Todos',
                  color: 'Todos',
                  acabado: 'Todos',
                  cantidad: '',
                  incluyeEquipo: false,
                })
              }
            />
          ) : (
            filteredProducts.map((product, i) =>
              product.modelos?.map((modelo, j) =>
                modelo.foto_portada ? (
                  <ProductCard
                    key={`${product._id}_${modelo.id}_${i}_${j}`}
                    product={product}
                    modelo={modelo}
                  />
                ) : null,
              ),
            )
          )}
        </section>
      </div>
    </div>
  );
};
