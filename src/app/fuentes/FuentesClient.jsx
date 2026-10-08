'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NoResults } from '@/components/productos/product-no-result';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

function getImageUrl(path) {
  if (!path) return '/gsg/no-image.svg';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${R2_BASE_URL}/${path}`;
}

const SERIES_ORDER = ['Ultra Slim', 'Slim'];

export default function FuentesClient({ initialPowerSupplies }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedVoltages, setSelectedVoltages] = useState([]);
  const [selectedPowers, setSelectedPowers] = useState([]);

  const availableSeries = useMemo(() => {
    const set = new Set(initialPowerSupplies.map((ps) => ps.series).filter(Boolean));
    const ordered = SERIES_ORDER.filter((s) => set.has(s));
    return [...ordered, ...[...set].filter((s) => !SERIES_ORDER.includes(s))];
  }, [initialPowerSupplies]);

  const availableVoltages = useMemo(() => {
    const set = new Set();
    initialPowerSupplies.forEach((ps) => ps.models.forEach((m) => set.add(Number(m.output_v))));
    return [...set].sort((a, b) => a - b);
  }, [initialPowerSupplies]);

  const availablePowers = useMemo(() => {
    const set = new Set(initialPowerSupplies.map((ps) => ps.powerW).filter((p) => p != null));
    return [...set].map(Number).sort((a, b) => a - b);
  }, [initialPowerSupplies]);

  const filtered = useMemo(() => {
    let list = initialPowerSupplies;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (ps) =>
          ps.name?.toLowerCase().includes(q) ||
          ps.code?.toLowerCase().includes(q) ||
          ps.description?.toLowerCase().includes(q) ||
          ps.models.some((m) => m.code.toLowerCase().includes(q)),
      );
    }
    if (selectedSeries.length > 0) {
      list = list.filter((ps) => selectedSeries.includes(ps.series));
    }
    if (selectedVoltages.length > 0) {
      list = list.filter((ps) =>
        ps.models.some((m) => selectedVoltages.includes(Number(m.output_v))),
      );
    }
    if (selectedPowers.length > 0) {
      list = list.filter((ps) => selectedPowers.includes(Number(ps.powerW)));
    }
    return list;
  }, [initialPowerSupplies, searchTerm, selectedSeries, selectedVoltages, selectedPowers]);

  const toggle = (setter) => (value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const activeFiltersCount =
    selectedSeries.length + selectedVoltages.length + selectedPowers.length;

  const handleClearFilters = () => {
    setSelectedSeries([]);
    setSelectedVoltages([]);
    setSelectedPowers([]);
  };

  const getCover = (ps) => {
    if (ps.photoUrl) return getImageUrl(ps.photoUrl);
    const img = ps.media.find((m) => m.kind === 'gallery' || m.kind === 'tech');
    return img ? getImageUrl(img.path) : '/gsg/no-image.svg';
  };

  const FilterGroup = ({ title, options, selected, onToggle, format = (v) => v }) =>
    options.length > 0 && (
      <div className="filter-group">
        <h4 className="filter-title">{title}</h4>
        <div className="filter-options">
          {options.map((opt) => (
            <label key={opt} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
              />
              <span className="checkbox-label">{format(opt)}</span>
            </label>
          ))}
        </div>
      </div>
    );

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

        <FilterGroup
          title="Línea"
          options={availableSeries}
          selected={selectedSeries}
          onToggle={toggle(setSelectedSeries)}
        />
        <FilterGroup
          title="Voltaje de salida"
          options={availableVoltages}
          selected={selectedVoltages}
          onToggle={toggle(setSelectedVoltages)}
          format={(v) => `${v} V CC`}
        />
        <FilterGroup
          title="Potencia"
          options={availablePowers}
          selected={selectedPowers}
          onToggle={toggle(setSelectedPowers)}
          format={(v) => `${v} W`}
        />
      </aside>

      {/* Contenido principal */}
      <div className="products-main-content">
        <div className="products-search-bar">
          <input
            type="text"
            placeholder="Buscar fuentes o códigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="products-search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="products-search-clear">
              Limpiar
            </button>
          )}
        </div>

        <div className="products-count">
          {filtered.length} {filtered.length === 1 ? 'fuente' : 'fuentes'}
        </div>

        {filtered.length === 0 ? (
          <NoResults
            title="No se encontraron fuentes"
            description="Intenta ajustar tus filtros o búsqueda"
          />
        ) : (
          <div className="products-grid">
            {filtered.map((ps) => (
              <Link
                key={ps.id}
                href={`/fuentes/${ps.code}`}
                className="product-grid-item group"
              >
                <div className="product-grid-image">
                  <Image
                    src={getCover(ps)}
                    alt={ps.name}
                    fill
                    className="object-contain bg-white transition-transform duration-300 group-hover:scale-105"
                  />
                  {ps.series && (
                    <span className="absolute top-2 left-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700">
                      {ps.series}
                    </span>
                  )}
                </div>
                <div className="product-grid-info">
                  <h3 className="product-grid-name">{ps.name}</h3>
                  <p className="product-grid-code">{ps.code}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ps.powerW != null && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {ps.powerW} W
                      </span>
                    )}
                    {ps.models.map((m) => (
                      <span
                        key={m.id}
                        className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {m.output_v} V
                      </span>
                    ))}
                    {ps.ipRating && (
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {ps.ipRating}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
