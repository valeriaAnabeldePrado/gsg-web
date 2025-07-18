'use client';
import React, { useState, useRef, useEffect } from 'react';
import FooterM from '@/components/footer/footer';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import GenericHero from '@/components/hero/genericHero';
import './distribuidores.css';
import Head from 'next/head';
import distribuidores from './utils/distriLocalidad.json';
import FloatingMapButton from './FloatingMapButton';
import MapSection from './MapSection';
import { NoResults } from '@/components/productos/product-no-result';

const words = `A través de nuestra red de distribuidores, aseguramos que nuestros productos y servicios lleguen a cada rincón, garantizando atención personalizada y calidad superior en cada interacción`;

// Componente para el dropdown personalizado
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <button
        type="button"
        className="custom-dropdown-toggle"
        onClick={handleToggle}
      >
        <span>{value || placeholder}</span>
        <span className={`custom-dropdown-arrow ${isOpen ? 'rotated' : ''}`}>
          ▼
        </span>
      </button>
      <div className={`custom-dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <div
            key={option}
            className={`custom-dropdown-item ${value === option ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para la tarjeta de distribuidor
const DistribuidorCard = ({ distribuidor, provincia }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start max-sm:flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {distribuidor.Nombre}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {distribuidor.Dirección}
            </p>
            <p className="text-sm text-gray-500">{distribuidor.Localidad}</p>
          </div>
          <div className="flex items-center space-x-2 max-sm:mt-4">
            {distribuidor.Teléfono !== 0 && (
              <p className="text-green-600 hover:text-green-700 text-sm font-medium">
                📞 {distribuidor.Teléfono}
              </p>
            )}
            <span className="text-gray-400">{isExpanded ? '▼' : '►'}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-3 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">📍</span>
              <span className="text-sm text-gray-700">
                {distribuidor.Dirección}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">🏢</span>
              <span className="text-sm text-gray-700">
                {distribuidor.Localidad}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">🗺️</span>
              <span className="text-sm text-gray-700">{provincia}</span>
            </div>
            {distribuidor.Teléfono !== 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">📞</span>
                <p className="text-sm text-green-600 hover:text-green-700 font-medium">
                  {distribuidor.Teléfono}
                </p>
              </div>
            )}
            <div className="pt-2">
              <a
                href={distribuidor['Link directo a Google Maps']}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <span>🗺️</span>
                <span>Ver en Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para la sección de provincia
const ProvinciaSection = ({ provincia, distribuidores }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 text-left hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{provincia}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {distribuidores.length} distribuidor
              {distribuidores.length !== 1 ? 'es' : ''}
            </p>
          </div>
          <span className="text-gray-500 text-lg">
            {isExpanded ? '▼' : '►'}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="bg-white p-6">
          <div className="grid gap-4">
            {distribuidores.map((distribuidor, index) => (
              <DistribuidorCard
                key={index}
                distribuidor={distribuidor}
                provincia={provincia}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para la lista de distribuidores
const ListaDistribuidores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvincia, setSelectedProvincia] = useState('Todas');

  // Obtener todas las provincias únicas
  const provincias = ['Todas', ...Object.keys(distribuidores)];

  // Filtrar distribuidores
  const filteredDistribuidores = Object.entries(distribuidores).reduce(
    (acc, [provincia, distribuidoresList]) => {
      // Filtrar por provincia seleccionada
      if (selectedProvincia !== 'Todas' && provincia !== selectedProvincia) {
        return acc;
      }

      const filtered = distribuidoresList.filter((distribuidor) => {
        const matchesSearch =
          searchTerm === '' ||
          distribuidor.Nombre.toLowerCase().includes(
            searchTerm.toLowerCase(),
          ) ||
          distribuidor.Dirección.toLowerCase().includes(
            searchTerm.toLowerCase(),
          ) ||
          distribuidor.Localidad.toLowerCase().includes(
            searchTerm.toLowerCase(),
          ) ||
          provincia.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
      });

      if (filtered.length > 0) {
        acc[provincia] = filtered;
      }

      return acc;
    },
    {},
  );

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="h2-hero-title md:text-4xl font-bold text-gray-900 ">
            Descubre nuestra red
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-10">
            Encuentra el distribuidor más cercano a tu ubicación. Contamos con
            una amplia red de puntos de venta en todo el país.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="mb-5 text-[var(--color-fuente-roja)] font-medium">
            Selecciona la Provincia y luego busca por localidad o distribuidor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="provincia"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filtrar por provincia
              </label>
              <CustomDropdown
                options={provincias}
                value={selectedProvincia}
                onChange={setSelectedProvincia}
                placeholder="Seleccionar provincia"
              />
            </div>
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Buscar distribuidor o localidad
              </label>
              <input
                type="text"
                id="search"
                placeholder="Buscar por dirección o localidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-[10px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex w-full mt-4">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedProvincia('Todas');
              }}
              className="bg-slate-100 border-red-200 border-2 text-red-500 px-4 py-3 rounded-full w-full"
            >
              Limpiar filtro
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {Object.values(filteredDistribuidores).reduce(
                  (total, distribuidores) => total + distribuidores.length,
                  0,
                )}
              </div>
              <div className="text-sm text-gray-600">Distribuidores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {Object.values(filteredDistribuidores).reduce(
                  (total, distribuidores) => {
                    const localidadesUnicas = new Set(
                      distribuidores.map((d) => d.Localidad),
                    );
                    return total + localidadesUnicas.size;
                  },
                  0,
                )}
              </div>
              <div className="text-sm text-gray-600">Localidades</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">24</div>
              <div className="text-sm text-gray-600">Provincias</div>
            </div>
          </div>
        </div>

        {/* Lista de distribuidores */}
        <div className="space-y-6">
          {Object.keys(filteredDistribuidores).length === 0 ? (
            <NoResults
              title={' No se encontraron distribuidores'}
              description={'Intenta ajustar los filtros de búsqueda'}
            />
          ) : (
            Object.entries(filteredDistribuidores).map(
              ([provincia, distribuidoresList]) => (
                <ProvinciaSection
                  key={provincia}
                  provincia={provincia}
                  distribuidores={distribuidoresList}
                />
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
};

const Distribuidores = () => {
  return (
    <>
      <Head>
        <title>Distribuidores - GSG</title>
        <meta
          name="Distribuidores"
          content="A través de nuestra red de distribuidores, aseguramos que nuestros productos y servicios lleguen a cada rincón, garantizando atención personalizada y calidad superior en cada interacción."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="p-[var(--padding-generico-x-y)]">
        <GenericHero titleHero={'NUESTRA RED DE DISTRIBUIDORES'} />
        <div className="flex responsive-container-dist">
          <TextGenerateEffect
            words={words}
            duration={0.1}
            className="flex-1 md:max-w-[80%]text-words"
          />
        </div>
      </div>

      {/* Lista de Distribuidores */}
      <ListaDistribuidores />

      {/* Mapa Section */}
      <MapSection />

      {/* Botón flotante para ir al mapa */}
      <FloatingMapButton />

      <FooterM />
    </>
  );
};

export default Distribuidores;
