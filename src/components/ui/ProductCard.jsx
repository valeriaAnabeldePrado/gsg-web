'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtener todas las imágenes cover del producto (generales y de variantes)
  const getAllCoverImages = () => {
    const images = [];

    // Imágenes generales del producto
    const productCovers =
      product.media?.filter((m) => m.kind === 'cover') || [];
    images.push(...productCovers);

    // Imágenes cover de cada variante
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant) => {
        const variantCovers =
          variant.media?.filter((m) => m.kind === 'cover') || [];
        images.push(...variantCovers);
      });
    }

    // Si no hay imágenes cover, buscar cualquier imagen
    if (images.length === 0) {
      const anyProductImage = product.media?.[0];
      if (anyProductImage) {
        images.push(anyProductImage);
      } else if (product.variants?.[0]?.media?.[0]) {
        images.push(product.variants[0].media[0]);
      } else {
        // Imagen placeholder por defecto
        images.push({
          path: '/gsg/no-image.svg',
          alt_text: product.name,
          kind: 'cover',
        });
      }
    }

    return images;
  };

  const coverImages = getAllCoverImages();
  const currentImage = coverImages[currentImageIndex];

  // Detectar si es un perfil LED (no tiene category pero tiene material)
  const isLedProfile = !product.category && product.material;

  // Detectar si es un accesorio (category.slug === 'accesorios')
  const isAccessory = product.category?.slug === 'accesorios';

  // Generar URL del enlace
  const getLinkUrl = () => {
    if (isLedProfile) {
      return `/productos/perfiles/${product.code}`;
    }
    if (isAccessory) {
      return `/accesorios/${product.code}`;
    }
    const categorySlug = product.category?.slug || 'sin-categoria';
    return `/productos/${categorySlug}/${product.code}`;
  };

  // Obtener nombre de categoría para mostrar
  const getCategoryName = () => {
    if (isLedProfile) {
      return 'Perfil LED';
    }
    if (isAccessory) {
      return 'Accesorio';
    }
    return product.category?.name || 'Sin categoría';
  };

  return (
    <div className="product-card-container">
      <Link href={getLinkUrl()}>
        <div className="product-card">
          {/* Card de imagen con navegación */}
          <div className="product-card-image-container relative group">
            <img
              src={currentImage.path}
              alt={currentImage.alt_text || product.name || 'Producto'}
              className="product-card-image"
            />

            {/* Flechas de navegación */}
            {coverImages.length > 1 && (
              <>
                {/* Flecha izquierda */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? coverImages.length - 1 : prev - 1,
                    );
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  aria-label="Imagen anterior"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Flecha derecha */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) =>
                      prev === coverImages.length - 1 ? 0 : prev + 1,
                    );
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  aria-label="Imagen siguiente"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Indicadores de imágenes si hay más de una */}
            {coverImages.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {coverImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-red-500 w-6'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Badge de cantidad de imágenes */}
            {coverImages.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{coverImages.length}
              </div>
            )}
          </div>{' '}
          {/* Pie de card con título */}
          <div className="product-card-footer">
            <h2 className="product-card-title">
              {product.name || 'Producto sin nombre'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{getCategoryName()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
