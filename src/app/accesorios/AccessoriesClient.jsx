'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NoResults } from '@/components/productos/product-no-result';

export default function AccessoriesClient({ initialAccessories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [selectedLightTones, setSelectedLightTones] = useState([]);

  // Extraer acabados únicos
  const availableFinishes = useMemo(() => {
    const finishesSet = new Map();
    initialAccessories.forEach((accessory) => {
      accessory.finishes?.forEach((finish) => {
        if (!finishesSet.has(finish.id)) {
          finishesSet.set(finish.id, finish);
        }
      });
    });
    return Array.from(finishesSet.values());
  }, [initialAccessories]);

  // Extraer tonos de luz únicos
  const availableLightTones = useMemo(() => {
    const tonesSet = new Map();
    initialAccessories.forEach((accessory) => {
      accessory.lightTones?.forEach((tone) => {
        if (!tonesSet.has(tone.id)) {
          tonesSet.set(tone.id, tone);
        }
      });
    });
    return Array.from(tonesSet.values()).sort((a, b) => a.kelvin - b.kelvin);
  }, [initialAccessories]);

  // Filtrar accesorios
  const filteredAccessories = useMemo(() => {
    let filtered = initialAccessories;

    // Filtro de búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((accessory) => {
        const nameMatch = accessory.name?.toLowerCase().includes(search);
        const descMatch = accessory.description?.toLowerCase().includes(search);
        const codeMatch = accessory.code?.toLowerCase().includes(search);
        return nameMatch || descMatch || codeMatch;
      });
    }

    // Filtro de acabados
    if (selectedFinishes.length > 0) {
      filtered = filtered.filter((accessory) =>
        accessory.finishes?.some((finish) =>
          selectedFinishes.includes(finish.id),
        ),
      );
    }

    // Filtro de tonos de luz
    if (selectedLightTones.length > 0) {
      filtered = filtered.filter((accessory) =>
        accessory.lightTones?.some((tone) =>
          selectedLightTones.includes(tone.id),
        ),
      );
    }

    return filtered;
  }, [searchTerm, initialAccessories, selectedFinishes, selectedLightTones]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilters = () => {
    setSelectedFinishes([]);
    setSelectedLightTones([]);
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

  // Obtener imagen del accesorio
  const getAccessoryImage = (accessory) => {
    if (accessory.media && accessory.media.length > 0) {
      const coverImage = accessory.media.find((m) => m.kind === 'gallery');
      if (coverImage) return coverImage.path;
      return accessory.media[0].path;
    }
    if (accessory.photoUrl) return accessory.photoUrl;
    return '/gsg/no-image.svg';
  };

  const activeFiltersCount =
    selectedFinishes.length + selectedLightTones.length;

  return (
    <div className="products-layout">
      {/* Sidebar de filtros */}
      <aside className="products-sidebar">
        <div className="sidebar-header">
          <h3>Filtros</h3>
          {activeFiltersCount > 0 && (
            <button onClick={handleClearFilters} className="clear-filters-btn">
              Limpiar ({activeFiltersCount})
            </button>
          )}
        </div>

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
      </aside>

      {/* Contenido principal */}
      <div className="products-main-content">
        {/* Barra de búsqueda */}
        <div className="products-search-bar">
          <input
            type="text"
            placeholder="Buscar accesorios..."
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
          {filteredAccessories.length}{' '}
          {filteredAccessories.length === 1 ? 'accesorio' : 'accesorios'}
        </div>

        {/* Grid de accesorios */}
        {filteredAccessories.length === 0 ? (
          <NoResults
            title="No se encontraron accesorios"
            description="Intenta ajustar tus filtros o búsqueda"
          />
        ) : (
          <div className="products-grid">
            {filteredAccessories.map((accessory) => (
              <Link
                key={accessory.id}
                href={`/accesorios/${accessory.code}`}
                className="product-grid-item"
              >
                <div className="product-grid-image">
                  <Image
                    src={getAccessoryImage(accessory)}
                    alt={accessory.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="product-grid-info">
                  <h3 className="product-grid-name">{accessory.name}</h3>
                  <p className="product-grid-code">{accessory.code}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
