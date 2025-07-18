'use client';
import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import { ProductCard } from '@/components/ui/ProductCard';
import { NoResults } from '@/components/productos/product-no-result';
import { ProductSkeletonList } from '@/components/ui/ProductSkeleton';

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

  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, search: '' }));
  };

  const getCategoryTitle = () => {
    if (filters.categoria && filters.categoria !== 'Todos') {
      return `Productos - ${filters.categoria}`;
    }
    return 'Todos los Productos';
  };

  return (
    <div className="min-h-screen md:mt-10 lg:mt-24 xl:mt-32">
      <div className="px-4 md:px-10 mb-6">
        <h1 className="text-2xl md:text-3xl font-light text-gray-800 ">
          {getCategoryTitle()}
        </h1>
      </div>

      <div className="px-4 md:px-10 mt-8 mb-4">
        <div className="flex items-center gap-3 max-w-2xl">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
            />
          </div>
          {filters.search && (
            <button onClick={handleClearSearch} className="clear-search-btn">
              Limpiar búsqueda
            </button>
          )}
        </div>
      </div>

      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          {loading ? (
            <ProductSkeletonList count={6} />
          ) : filteredProducts.length === 0 ? (
            <NoResults
              title={' No se encontraron los productos'}
              description={
                'Intenta ajustar tu búsqueda o explorar otras categorías'
              }
            />
          ) : (
            filteredProducts.map((product, i) =>
              product.modelos?.map((modelo, j) =>
                modelo.foto_portada ? (
                  <ProductCard
                    key={`${product._id}_${modelo.id}_${i}_${j}`}
                    title={product.nombre}
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
