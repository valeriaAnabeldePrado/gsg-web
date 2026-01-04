'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  getFamilyCoverImage,
  formatVariantDisplay,
  getFamilyPriceRange,
  groupVariantsBy,
} from '@/lib/supabase/led-roll-sdk';

export default function LedRollsClient({ initialFamilies, filterOptions }) {
  const [selectedLedType, setSelectedLedType] = useState('');
  const [selectedVoltage, setSelectedVoltage] = useState('');
  const [selectedIP, setSelectedIP] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar familias según los filtros activos
  const filteredFamilies = useMemo(() => {
    return initialFamilies.filter((family) => {
      // Filtro por tipo de LED
      if (selectedLedType && family.ledType !== selectedLedType) {
        return false;
      }

      // Filtro por búsqueda en nombre o descripción
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchName = family.name.toLowerCase().includes(search);
        const matchDesc = family.description?.toLowerCase().includes(search);
        if (!matchName && !matchDesc) {
          return false;
        }
      }

      // Filtros de variantes (voltaje, IP)
      if (selectedVoltage || selectedIP) {
        const hasMatchingVariant = family.variants?.some((variant) => {
          if (
            selectedVoltage &&
            variant.voltage !== parseInt(selectedVoltage)
          ) {
            return false;
          }
          if (selectedIP && variant.ipRating !== parseInt(selectedIP)) {
            return false;
          }
          return true;
        });

        if (!hasMatchingVariant) {
          return false;
        }
      }

      return true;
    });
  }, [
    initialFamilies,
    selectedLedType,
    selectedVoltage,
    selectedIP,
    searchTerm,
  ]);

  // Resetear filtros
  const resetFilters = () => {
    setSelectedLedType('');
    setSelectedVoltage('');
    setSelectedIP('');
    setSearchTerm('');
  };

  const hasActiveFilters =
    selectedLedType || selectedVoltage || selectedIP || searchTerm;

  return (
    <>
      {/* Hero Section */}
      <section className="led-hero">
        <div className="led-hero-content">
          <h1 className="led-hero-title">Tiras LED Profesionales</h1>
          <p className="led-hero-subtitle">
            Soluciones de iluminación LED de alta calidad. COB, SMD y más
            tecnologías con diferentes potencias, temperaturas de color y
            protecciones IP.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="led-filters-section">
        <div className="led-filters-container">
          {/* Search */}
          <div className="filter-group">
            <label className="filter-label">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>

          {/* LED Type Filter */}
          <div className="filter-group">
            <label className="filter-label">Tipo de LED</label>
            <select
              value={selectedLedType}
              onChange={(e) => setSelectedLedType(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos</option>
              {filterOptions?.ledTypes?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Voltage Filter */}
          <div className="filter-group">
            <label className="filter-label">Voltaje</label>
            <select
              value={selectedVoltage}
              onChange={(e) => setSelectedVoltage(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos</option>
              {filterOptions?.voltages?.map((voltage) => (
                <option key={voltage} value={voltage}>
                  {voltage}V
                </option>
              ))}
            </select>
          </div>

          {/* IP Rating Filter */}
          <div className="filter-group">
            <label className="filter-label">Protección IP</label>
            <select
              value={selectedIP}
              onChange={(e) => setSelectedIP(e.target.value)}
              className="filter-select"
            >
              <option value="">Todas</option>
              {filterOptions?.ipRatings?.map((ip) => (
                <option key={ip} value={ip}>
                  IP{ip}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <button onClick={resetFilters} className="filter-reset">
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      {/* Results Count */}
      <section className="led-results-info">
        <p className="results-count">
          {filteredFamilies.length}{' '}
          {filteredFamilies.length === 1 ? 'familia' : 'familias'} encontradas
        </p>
      </section>

      {/* Families Grid */}
      <section className="led-families-grid">
        {filteredFamilies.map((family) => {
          const coverImage = getFamilyCoverImage(family);
          const priceRange = getFamilyPriceRange(family);
          const voltageGroups = family.variants
            ? groupVariantsBy(family.variants, 'voltage')
            : {};
          const ipGroups = family.variants
            ? groupVariantsBy(family.variants, 'ipRating')
            : {};

          return (
            <article key={family.id} className="family-card">
              {/* Image */}
              <div className="family-image">
                {coverImage ? (
                  <img
                    src={coverImage.path}
                    alt={coverImage.alt_text || family.name}
                    loading="lazy"
                  />
                ) : (
                  <img
                    src="/gsg/no-image.svg"
                    alt="Sin imagen"
                    loading="lazy"
                  />
                )}
                {family.featured && (
                  <span className="family-badge">Destacado</span>
                )}
              </div>

              {/* Content */}
              <div className="family-content">
                {/* Header */}
                <div className="family-header">
                  <h3 className="family-name">{family.name}</h3>
                  <span className="family-led-type">{family.ledType}</span>
                </div>

                {/* Description */}
                {family.description && (
                  <p className="family-description">{family.description}</p>
                )}

                {/* Specs */}
                <div className="family-specs">
                  {family.ledsPerMeter && (
                    <div className="spec-item">
                      <span className="spec-label">LEDs/m:</span>
                      <span className="spec-value">{family.ledsPerMeter}</span>
                    </div>
                  )}
                  {family.pcbWidthMm && (
                    <div className="spec-item">
                      <span className="spec-label">Ancho PCB:</span>
                      <span className="spec-value">{family.pcbWidthMm}mm</span>
                    </div>
                  )}
                  {family.cri && (
                    <div className="spec-item">
                      <span className="spec-label">CRI:</span>
                      <span className="spec-value">{family.cri}</span>
                    </div>
                  )}
                  {family.dimmable && (
                    <div className="spec-badge">Dimeable</div>
                  )}
                </div>

                {/* Variants Summary */}
                {family.variants && family.variants.length > 0 && (
                  <div className="family-variants-summary">
                    <span className="variants-count">
                      {family.variants.length}{' '}
                      {family.variants.length === 1 ? 'variante' : 'variantes'}
                    </span>
                    <div className="variants-tags">
                      {Object.keys(voltageGroups).map((voltage) => (
                        <span key={voltage} className="variant-tag">
                          {voltage}V
                        </span>
                      ))}
                      {Object.keys(ipGroups).map((ip) => (
                        <span key={ip} className="variant-tag">
                          IP{ip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                {priceRange && (
                  <div className="family-price">
                    {priceRange.min === priceRange.max ? (
                      <span>${priceRange.min.toLocaleString()}</span>
                    ) : (
                      <span>
                        ${priceRange.min.toLocaleString()} - $
                        {priceRange.max.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA */}
                <Link href={`/led/${family.id}`} className="family-cta">
                  Ver detalles
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* Empty State */}
      {filteredFamilies.length === 0 && (
        <div className="led-empty-state">
          <p>No se encontraron familias con los filtros seleccionados.</p>
          <button onClick={resetFilters} className="empty-state-button">
            Ver todas las familias
          </button>
        </div>
      )}
    </>
  );
}
