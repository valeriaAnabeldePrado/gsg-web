'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NoResults } from '@/components/productos/product-no-result';

const ACCESSORY_TYPES = [
  'Amplificadores',
  'Controladoras',
  'Dimmers',
  'Conectores',
  'Sensores',
  'Cargadores',
];

const tipoBadgeColor = 'bg-gray-100 text-gray-700';

export default function AccessoriesClient({ initialAccessories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [selectedLightTones, setSelectedLightTones] = useState([]);

  // Extraer tipos únicos
  const availableTypes = useMemo(() => {
    const typesSet = new Set();
    initialAccessories.forEach((accessory) => {
      if (accessory.tipo) typesSet.add(accessory.tipo);
    });
    const ordered = ACCESSORY_TYPES.filter((t) => typesSet.has(t));
    const others = Array.from(typesSet).filter((t) => !ACCESSORY_TYPES.includes(t));
    return [...ordered, ...others];
  }, [initialAccessories]);

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

    // Filtro de tipos
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((accessory) =>
        selectedTypes.includes(accessory.tipo),
      );
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
  }, [searchTerm, initialAccessories, selectedTypes, selectedFinishes, selectedLightTones]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedFinishes([]);
    setSelectedLightTones([]);
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type],
    );
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
    selectedTypes.length + selectedFinishes.length + selectedLightTones.length;

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

        {/* Tipos de Accesorio */}
        {availableTypes.length > 0 && (
          <div className="filter-group">
            <h4 className="filter-title">Tipo de Accesorio</h4>
            <div className="filter-options">
              {availableTypes.map((type) => (
                <label key={type} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className="checkbox-label">{type}</span>
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
                className="product-grid-item group"
              >
                <div className="product-grid-image">
                  <Image
                    src={getAccessoryImage(accessory)}
                    alt={accessory.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {accessory.tipo && (
                    <span className={`absolute top-2 left-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tipoBadgeColor}`}>
                      {accessory.tipo}
                    </span>
                  )}
                </div>
                <div className="product-grid-info">
                  <h3 className="product-grid-name">{accessory.name}</h3>
                  <p className="product-grid-code">{accessory.code}</p>
                  {/* Specs mini */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {accessory.watt && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {accessory.watt}W
                      </span>
                    )}
                    {accessory.amperage && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {accessory.amperage}A
                      </span>
                    )}
                    {accessory.voltageLabel && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {accessory.voltageLabel}
                      </span>
                    )}
                  </div>
                  {accessory.lightTones?.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {accessory.lightTones.slice(0, 3).map((tone) => (
                        <span key={tone.id} className="text-[10px] text-gray-400">
                           {tone.name}{tone.kelvin ? ` (${tone.kelvin}K)` : ''}
                         </span>
                       ))}
                       {accessory.lightTones.length > 3 && (
                         <span className="text-[10px] text-gray-400">+{accessory.lightTones.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
