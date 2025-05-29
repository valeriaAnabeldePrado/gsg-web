'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import Filtering from '@/components/productos/filter';

const ProductosContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estado unificado para todos los filtros
  const [filters, setFilters] = useState({
    search: '',
    categoria: searchParams.get('categoria') || 'Todos',
    color: 'Todos',
    acabado: 'Todos',
    cantidad: '',
    incluyeEquipo: false,
  });

  // Scroll al top cuando cambia la ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Sincronizar categoría con URL params
  useEffect(() => {
    const urlCategoria = searchParams.get('categoria');
    if (urlCategoria && urlCategoria !== filters.categoria) {
      setFilters((prev) => ({
        ...prev,
        categoria: urlCategoria,
      }));
    }
  }, [searchParams]);

  // Función para construir query string
  const buildQuery = (currentFilters) => {
    const params = new URLSearchParams();

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value && value !== 'Todos' && value !== false) {
        params.append(key, value.toString());
      }
    });

    return params.toString();
  };

  // Fetch productos cuando cambian los filtros
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = buildQuery(filters);
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

    fetchProducts();
  }, [filters]);

  // Filtrado local adicional para búsqueda en tiempo real
  const filteredProducts = products.filter((product) => {
    if (!filters.search) return true;

    const searchTerm = filters.search.toLowerCase();
    const nameMatch = product.nombre?.toLowerCase().includes(searchTerm);
    const modelMatch = product.modelos?.some((modelo) =>
      modelo.subnombre?.toLowerCase().includes(searchTerm),
    );

    return nameMatch || modelMatch;
  });

  // Manejar cambio de búsqueda (separado para mejor UX)
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  // Manejar cambios de otros filtros
  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Renderizar productos
  const renderProducts = () => {
    if (loading) return <LoaderP />;

    if (filteredProducts.length === 0) {
      return (
        <div className="w-full text-center py-20">
          <p className="text-xl text-gray-500 mb-4">
            No se encontraron productos
          </p>
          <button
            onClick={() =>
              setFilters({
                search: '',
                categoria: 'Todos',
                color: 'Todos',
                acabado: 'Todos',
                wattMin: '',
                wattMax: '',
                incluyeEquipo: false,
              })
            }
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      );
    }

    return filteredProducts.map((product, i) =>
      product.modelos?.map((modelo, j) =>
        modelo.foto_portada ? (
          <ProductCard
            key={`${product._id}_${modelo.id}_${i}_${j}`}
            product={product}
            modelo={modelo}
          />
        ) : null,
      ),
    );
  };

  return (
    <div className="min-h-screen">
      {/* Barra de búsqueda */}
      <div className="px-4 md:px-10 mb-6">
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

      {/* Filtros */}
      <div className="px-4 md:px-10 mb-8">
        <Filtering filters={filters} onChange={handleFiltersChange} />
      </div>

      {/* Productos */}
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          {renderProducts()}
        </section>
      </div>
    </div>
  );
};

// Componente para tarjeta de producto (separado para mejor legibilidad)
const ProductCard = ({ product, modelo }) => (
  <div className="container-itemss group transform transition-transform duration-300 hover:scale-105 rounded-3xl">
    <Link href={`/productos/${product.categoria}/${product._id}`}>
      <div className="relative container-img-gg transform transition-transform duration-300 rounded-3xl overflow-hidden">
        <Image
          src={modelo.foto_portada}
          alt={modelo.subnombre || 'Producto'}
          fill
          className="img-class rounded-3xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="mask rounded-3xl"></div>
        <h2 className="title-gallery">{modelo.subnombre}</h2>
      </div>
    </Link>
  </div>
);

// Componente principal con Suspense
const Productos = () => {
  return (
    <Suspense fallback={<LoaderP />}>
      <ProductosContent />
    </Suspense>
  );
};

export default Productos;
