'use client';

import React, { useState, useMemo, useRef } from 'react';
import { NoResults } from '@/components/productos/product-no-result';
import './distribuidores-premium.css';

export default function DistribuidoresClient({ initialDistribuidores }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvincia, setSelectedProvincia] = useState('Todas');
  const mainContentRef = useRef(null);

  // Scroll al top de la lista cuando cambia la provincia
  const handleProvinciaChange = (provincia) => {
    setSelectedProvincia(provincia);
    if (window.innerWidth < 968) {
      // En móvil, scrollear al contenido
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // En desktop, scrollear suavemente al inicio de la lista si estamos muy abajo
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  // Obtener provincias y contar distribuidores
  const provinciasData = useMemo(() => {
    const provincias = Object.keys(initialDistribuidores).sort();
    return provincias.map((prov) => ({
      name: prov,
      count: initialDistribuidores[prov].length,
    }));
  }, [initialDistribuidores]);

  const totalDistribuidores = Object.values(initialDistribuidores).flat().length;

  // Filtrar distribuidores
  const filteredDistribuidores = useMemo(() => {
    let allDistribuidores = [];
    
    // Si es 'Todas', aplanar el objeto
    if (selectedProvincia === 'Todas') {
      Object.values(initialDistribuidores).forEach(list => {
        allDistribuidores = [...allDistribuidores, ...list];
      });
    } else {
      allDistribuidores = initialDistribuidores[selectedProvincia] || [];
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return allDistribuidores.filter((d) => 
        d.name.toLowerCase().includes(search) ||
        d.city.toLowerCase().includes(search) ||
        d.address.toLowerCase().includes(search)
      );
    }

    return allDistribuidores;
  }, [initialDistribuidores, selectedProvincia, searchTerm]);

  return (
    <div className="distribuidores-layout">
      {/* Sidebar */}
      <aside className="distribuidores-sidebar" data-lenis-prevent>
        <div className="sidebar-header">
          <h3>Ubicación</h3>
        </div>
        <div className="province-list">
          <div
            className={`province-item ${selectedProvincia === 'Todas' ? 'active' : ''}`}
            onClick={() => handleProvinciaChange('Todas')}
          >
            <span>Todas las provincias</span>
            <span className="province-count">{totalDistribuidores}</span>
          </div>
          {provinciasData.map((prov) => (
            <div
              key={prov.name}
              className={`province-item ${selectedProvincia === prov.name ? 'active' : ''}`}
              onClick={() => handleProvinciaChange(prov.name)}
            >
              <span>{prov.name}</span>
              <span className="province-count">{prov.count}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="distribuidores-main" ref={mainContentRef}>
        <div className="distribuidores-search">
          <input
            type="text"
            placeholder="Buscar por nombre, ciudad o dirección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredDistribuidores.length === 0 ? (
          <NoResults
            title="No se encontraron distribuidores"
            description="Intenta ajustar tu búsqueda o filtro"
          />
        ) : (
          <div className="distribuidores-grid">
            {filteredDistribuidores.map((distribuidor, index) => (
              <div key={index} className="distribuidor-card">
                <div>
                  <h3 className="distribuidor-name">{distribuidor.name}</h3>
                  <div className="distribuidor-city">{distribuidor.city}</div>
                  <p className="distribuidor-address">{distribuidor.address}</p>
                </div>
                <div className="distribuidor-actions">
                  {distribuidor.phone && (
                    <a href={`tel:${distribuidor.phone}`} className="action-link">
                      Llamar
                    </a>
                  )}
                  {distribuidor.googleMapsLink && (
                    <a
                      href={distribuidor.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link"
                    >
                      Ver Mapa
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
