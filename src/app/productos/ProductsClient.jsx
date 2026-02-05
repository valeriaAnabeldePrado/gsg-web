'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NoResults } from '@/components/productos/product-no-result';
import ProfileComparisonTable from '@/components/products/ProfileComparisonTable';

export default function ProductsClient({
  initialProducts,
  categoria,
  categories,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [selectedLightTones, setSelectedLightTones] = useState([]);
  const [includesLed, setIncludesLed] = useState(null);
  const [includesDriver, setIncludesDriver] = useState(null);
  const [selectedUso, setSelectedUso] = useState([]);

  // Mapeo de usos por código de perfil
  const perfilUsos = {
    P01: ['APLICAR', 'EMBUTIR'],
    P02: ['APLICAR'],
    ANGULO: ['APLICAR'],
    PH1: ['APLICAR'],
    PH2: ['SUSPENDER'],
    PV8: ['APLICAR'],
    'MINI PE': ['EMBUTIR'],
    PEM: ['EMBUTIR'],
    PEXL: ['EMBUTIR'],
    GARGANTA: ['APLICAR'],
    INVISIBLE: ['APLICAR'],
    ESCALERA: ['APLICAR'],
    PISO: ['APLICAR'],
    PEI: ['EMBUTIR'],
    'PTS-024': ['APLICAR'],
    'PTS-020': ['APLICAR', 'EMBUTIR'],
    'PTS-038': ['APLICAR'],
    'PWS 101B/ 102B': ['EMBUTIR'],
    'PWS 109/110': ['EMBUTIR'],
    'PBS 144/145': ['EMBUTIR'],
  };

  // Limpiar búsqueda cuando cambia la categoría
  useEffect(() => {
    setSearchTerm('');
  }, [categoria]);

  // Extraer categorías únicas de todos los productos
  const availableCategories = useMemo(() => {
    const categoriesSet = new Map();
    initialProducts.forEach((product) => {
      if (product.category) {
        if (!categoriesSet.has(product.category.id)) {
          categoriesSet.set(product.category.id, product.category);
        }
      }
    });
    return Array.from(categoriesSet.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [initialProducts]);

  // Extraer acabados únicos de todos los productos
  const availableFinishes = useMemo(() => {
    const finishesSet = new Map();
    initialProducts.forEach((product) => {
      product.finishes?.forEach((finish) => {
        if (!finishesSet.has(finish.id)) {
          finishesSet.set(finish.id, finish);
        }
      });
    });
    return Array.from(finishesSet.values());
  }, [initialProducts]);

  // Extraer tonos de luz únicos
  const availableLightTones = useMemo(() => {
    const tonesSet = new Map();
    initialProducts.forEach((product) => {
      product.variants?.forEach((variant) => {
        variant.lightTones?.forEach((tone) => {
          if (!tonesSet.has(tone.id)) {
            tonesSet.set(tone.id, tone);
          }
        });
      });
    });
    return Array.from(tonesSet.values()).sort((a, b) => a.kelvin - b.kelvin);
  }, [initialProducts]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    // Filtro de búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(search);
        const descMatch = product.description?.toLowerCase().includes(search);
        const codeMatch = product.code?.toLowerCase().includes(search);
        return nameMatch || descMatch || codeMatch;
      });
    }

    // Filtro de categoría
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category?.id === selectedCategory,
      );
    }

    // Filtro de acabados
    if (selectedFinishes.length > 0) {
      filtered = filtered.filter((product) =>
        product.finishes?.some((finish) =>
          selectedFinishes.includes(finish.id),
        ),
      );
    }

    // Filtro de tonos de luz
    if (selectedLightTones.length > 0) {
      filtered = filtered.filter((product) =>
        product.variants?.some((variant) =>
          variant.lightTones?.some((tone) =>
            selectedLightTones.includes(tone.id),
          ),
        ),
      );
    }

    // Filtro incluye LED
    if (includesLed !== null) {
      filtered = filtered.filter((product) =>
        product.variants?.some(
          (variant) => variant.includesLed === includesLed,
        ),
      );
    }

    // Filtro incluye Driver
    if (includesDriver !== null) {
      filtered = filtered.filter((product) =>
        product.variants?.some(
          (variant) => variant.includesDriver === includesDriver,
        ),
      );
    }

    // Filtro de USO (solo para perfiles)
    if (selectedUso.length > 0) {
      filtered = filtered.filter((product) => {
        const isProfile = !product.category && product.material;
        if (!isProfile) return true; // No filtrar productos normales

        // Buscar el código del producto en el mapeo
        const productCode = product.code?.toUpperCase();
        const productName = product.name?.toUpperCase();

        // Buscar coincidencia exacta o parcial
        const usos = Object.keys(perfilUsos).find((key) => {
          const keyUpper = key.toUpperCase();
          return (
            productCode?.includes(keyUpper) || productName?.includes(keyUpper)
          );
        });

        if (!usos) return false;

        // Verificar si el perfil tiene alguno de los usos seleccionados
        const perfilTieneUso = perfilUsos[usos].some((uso) =>
          selectedUso.includes(uso),
        );

        return perfilTieneUso;
      });
    }

    return filtered;
  }, [
    searchTerm,
    initialProducts,
    selectedCategory,
    selectedFinishes,
    selectedLightTones,
    includesLed,
    includesDriver,
    selectedUso,
  ]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedFinishes([]);
    setSelectedLightTones([]);
    setIncludesLed(null);
    setIncludesDriver(null);
    setSelectedUso([]);
  };

  const toggleFinish = (finishId) => {
    setSelectedFinishes((prev) =>
      prev.includes(finishId)
        ? prev.filter((id) => id !== finishId)
        : [...prev, finishId],
    );
  };

  const toggleLightTone = (toneId) => {
    setSelectedLightTones((prev) =>
      prev.includes(toneId)
        ? prev.filter((id) => id !== toneId)
        : [...prev, toneId],
    );
  };

  const toggleUso = (uso) => {
    setSelectedUso((prev) =>
      prev.includes(uso) ? prev.filter((u) => u !== uso) : [...prev, uso],
    );
  };

  // Obtener todas las imágenes de portada del producto (incluyendo variantes)
  const getProductImages = (product) => {
    const images = [];

    // Detectar si es un perfil LED (viene de led_profiles table)
    // product.material existe y es string para perfiles LED
    const isProfile = !product.category && !!product.material;

    if (isProfile) {
      // Para perfiles LED, usar imágenes de tipo 'gallery'
      if (product.media && Array.isArray(product.media)) {
        const galleryImages = product.media.filter((m) => m.kind === 'gallery');
        images.push(...galleryImages.map((img) => img.path));
      }
    } else {
      // Para productos normales
      // Imágenes del producto general
      if (product.media && Array.isArray(product.media)) {
        const coverImages = product.media.filter((m) => m.kind === 'cover');
        images.push(...coverImages.map((img) => img.path));
      }

      // Imágenes de las variantes
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          if (variant.media && variant.media.length > 0) {
            const variantCovers = variant.media.filter(
              (m) => m.kind === 'cover',
            );
            variantCovers.forEach((img) => {
              // Evitar duplicados
              if (!images.includes(img.path)) {
                images.push(img.path);
              }
            });
          }
        });
      }
    }

    // Si no hay imágenes, usar placeholder
    if (images.length === 0) {
      images.push('/gsg/no-image.svg');
    }

    return images;
  };

  const getProductLink = (product) => {
    const isProfile = !product.category && product.material;
    if (isProfile) {
      return `/productos/perfiles/${product.code}`;
    }
    return `/productos/${product.category?.slug || 'otros'}/${product.code}`;
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedFinishes.length +
    selectedLightTones.length +
    (includesLed !== null ? 1 : 0) +
    (includesDriver !== null ? 1 : 0) +
    selectedUso.length;

  return (
    <div className="products-layout">
      {/* Sidebar de filtros */}
      <aside className="products-sidebar" data-lenis-prevent>
        <div className="sidebar-header">
          <h3>Filtros</h3>
          {activeFiltersCount > 0 && (
            <button onClick={handleClearFilters} className="clear-filters-btn">
              Limpiar ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Categorías */}
        {availableCategories.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-title">Categorías</h4>
            <div className="filter-options">
              {availableCategories.map((category) => (
                <label key={category.id} className="filter-checkbox">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() =>
                      setSelectedCategory(
                        selectedCategory === category.id ? null : category.id,
                      )
                    }
                  />
                  <span className="checkbox-label">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Acabados */}
        {availableFinishes.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-title">Acabados</h4>
            <div className="filter-options">
              {availableFinishes.map((finish) => (
                <label key={finish.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFinishes.includes(finish.id)}
                    onChange={() => toggleFinish(finish.id)}
                  />
                  <span className="checkbox-label">
                    {finish.hex_color && (
                      <span
                        className="color-swatch"
                        style={{ backgroundColor: finish.hex_color }}
                      />
                    )}
                    {finish.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Tonos de Luz */}
        {availableLightTones.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-title">Tonos de Luz</h4>
            <div className="filter-options">
              {availableLightTones.map((tone) => (
                <label key={tone.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedLightTones.includes(tone.id)}
                    onChange={() => toggleLightTone(tone.id)}
                  />
                  <span className="checkbox-label">
                    {tone.name}
                    {tone.kelvin && (
                      <span className="tone-kelvin">{tone.kelvin}K</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Características */}
        <div className="filter-group">
          <h4 className="filter-title">Características</h4>
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={includesLed === true}
                onChange={(e) => setIncludesLed(e.target.checked ? true : null)}
              />
              <span className="checkbox-label">Incluye LED</span>
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={includesDriver === true}
                onChange={(e) =>
                  setIncludesDriver(e.target.checked ? true : null)
                }
              />
              <span className="checkbox-label">Incluye Driver</span>
            </label>
          </div>
        </div>

        {/* Filtro de USO - Solo para Perfiles */}
        {categoria?.toLowerCase() === 'perfiles' && (
          <div className="filter-group">
            <h4 className="filter-title">Uso</h4>
            <div className="filter-options">
              {['APLICAR', 'SUSPENDER', 'EMBUTIR'].map((uso) => (
                <label key={uso} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedUso.includes(uso)}
                    onChange={() => toggleUso(uso)}
                  />
                  <span className="checkbox-label">{uso}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Contenido principal */}
      <div className="products-main-content">
        {/* Barra de búsqueda */}
        <div className="products-search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="products-search-input"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="products-search-clear"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Contador de resultados */}
        <div className="products-count">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'producto' : 'productos'}
        </div>

        {/* PROFILE COMPARISON TABLE */}
        {categoria?.toLowerCase() === 'perfiles' && (
          <div className="mb-8">
            <ProfileComparisonTable />
          </div>
        )}

        {/* Grid de productos */}
        {filteredProducts.length === 0 ? (
          <NoResults
            title="No se encontraron productos"
            description="Intenta ajustar tus filtros o búsqueda"
          />
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const isProfile = !product.category && product.material;
              const uniqueKey = isProfile
                ? `profile-${product.code}`
                : `product-${product.id}`;

              return (
                <ProductGridItem
                  key={uniqueKey}
                  product={product}
                  images={getProductImages(product)}
                  link={getProductLink(product)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para cada item del grid con carrusel de imágenes
function ProductGridItem({ product, images, link }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-avanzar imágenes cuando hay hover
  useEffect(() => {
    if (!isHovering || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1000); // Cambiar cada 1 segundo

    return () => clearInterval(interval);
  }, [isHovering, images.length]);

  // Reset al quitar hover
  useEffect(() => {
    if (!isHovering) {
      setCurrentImageIndex(0);
    }
  }, [isHovering]);

  return (
    <Link
      href={link}
      className="product-grid-item"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="product-grid-image">
        <Image
          src={images[currentImageIndex]}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Indicadores de imágenes */}
        {images.length > 1 && (
          <div className="image-indicators">
            {images.map((_, index) => (
              <span
                key={index}
                className={`indicator-dot ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="product-grid-info">
        <h3 className="product-grid-name">{product.name}</h3>
        <p className="product-grid-code">{product.code}</p>
      </div>
    </Link>
  );
}
