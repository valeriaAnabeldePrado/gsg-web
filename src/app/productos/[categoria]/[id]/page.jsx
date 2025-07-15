'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Measure from '@/app/productos/[categoria]/[id]/measure';
import LoaderP from '@/components/loader/loagerP';
import '../../productosSection.css';
import { IMG_URL } from '@/utils/constants';

export default function ProductPage({ params }) {
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/product?id=${id}`);

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.product) {
          setProduct(data.product);
          setCategoria(data.product.categoria);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al obtener el producto:', err);
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleModelChange = (index) => {
    setSelectedModelIndex(index);
  };
  console.log(selectedModelIndex);

  const getCleanSubnombre = (subnombre) => {
    return subnombre?.replace('Colgante ', '') || '';
  };

  const getImageUrl = (modeloId) => {
    return `${IMG_URL}/${modeloId}.png`;
  };

  const getProductImageUrl = (fotosProducto) => {
    return `https://images.smartcloudstudio.com/gsg/fotos_blanco/${categoria.toLowerCase()}/${fotosProducto}`;
  };

  if (loading) {
    return <LoaderP />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El producto que buscas no existe o no está disponible.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  const selectedModel = product.modelos?.[selectedModelIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {categoria}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.nombre}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.descripcion}
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg bg-white p-6">
                {product.modelos?.[0] && (
                  <img
                    src={getImageUrl(product.modelos[0].id)}
                    alt={product.code || product.nombre}
                    loading="lazy"
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-300 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Model Selection Buttons */}
        {product.modelos && product.modelos.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {product.modelos.length === 1
                ? 'Modelo disponible'
                : 'Selecciona un modelo'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.modelos.map((modelo, index) => (
                <button
                  key={modelo.id}
                  onClick={() => handleModelChange(index)}
                  className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    selectedModelIndex === index
                      ? 'border-red-500 bg-red-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {/* Imagen del modelo */}
                  <div className="aspect-square p-4 bg-gray-50 rounded-t-lg">
                    <img
                      src={getProductImageUrl(modelo.fotos_producto)}
                      alt={modelo.subnombre}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Texto del modelo */}
                  <div className="p-3 border-t border-gray-100">
                    <p
                      className={`text-sm font-medium text-center ${
                        selectedModelIndex === index
                          ? 'text-red-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {getCleanSubnombre(modelo.subnombre)}
                    </p>
                  </div>

                  {/* Indicador de selección */}
                  {selectedModelIndex === index && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Selected Model Details */}
        {selectedModel && (
          <section className="space-y-8">
            {/* Characteristics Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Características Técnicas
                </h2>
                <p className="text-gray-600">
                  Especificaciones detalladas del producto seleccionado
                </p>
              </div>

              <Measure
                product={{
                  ...product,
                  productCharacteristics: selectedModel.caracteristicasTecnicas,
                }}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
