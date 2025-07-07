'use client';
import React, { useState } from 'react';
import FooterM from '@/components/footer/footer';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import GenericHero from '@/components/hero/genericHero';
import './distribuidores.css';
import Head from 'next/head';
import distribuidores from './utils/distriLocalidad.json';
import FloatingMapButton from './FloatingMapButton';
import MapSection from './MapSection';

const words = `A través de nuestra red de distribuidores, aseguramos que nuestros productos y servicios lleguen a cada rincón, garantizando atención personalizada y calidad superior en cada interacción`;

// Componente para la tarjeta de distribuidor
const DistribuidorCard = ({ distribuidor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {distribuidor.Nombre}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {distribuidor.Dirección}
            </p>
            <p className="text-sm text-gray-500">{distribuidor.Provincia}</p>
          </div>
          <div className="flex items-center space-x-2">
            {distribuidor.Teléfono !== 0 && (
              <a
                href={`tel:${distribuidor.Teléfono}`}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                📞 {distribuidor.Teléfono}
              </a>
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
                {distribuidor.Provincia}
              </span>
            </div>
            {distribuidor.Teléfono !== 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">📞</span>
                <a
                  href={`tel:${distribuidor.Teléfono}`}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  {distribuidor.Teléfono}
                </a>
              </div>
            )}
            <div className="pt-2">
              <a
                href={distribuidor.Link}
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

// Componente para la sección de localidad
const LocalidadSection = ({ localidad, distribuidores }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 text-left hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{localidad}</h2>
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
              <DistribuidorCard key={index} distribuidor={distribuidor} />
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
  const provincias = [
    'Todas',
    ...new Set(
      Object.values(distribuidores)
        .flat()
        .map((d) => d.Provincia),
    ),
  ];

  // Filtrar distribuidores
  const filteredDistribuidores = Object.entries(distribuidores).reduce(
    (acc, [localidad, distribuidoresList]) => {
      const filtered = distribuidoresList.filter((distribuidor) => {
        const matchesSearch =
          searchTerm === '' ||
          distribuidor.Nombre.toLowerCase().includes(
            searchTerm.toLowerCase(),
          ) ||
          distribuidor.Dirección.toLowerCase().includes(
            searchTerm.toLowerCase(),
          ) ||
          localidad.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProvincia =
          selectedProvincia === 'Todas' ||
          distribuidor.Provincia === selectedProvincia;

        return matchesSearch && matchesProvincia;
      });

      if (filtered.length > 0) {
        acc[localidad] = filtered;
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Buscar por nombre, dirección o localidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="provincia"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filtrar por provincia
              </label>
              <select
                id="provincia"
                value={selectedProvincia}
                onChange={(e) => setSelectedProvincia(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              >
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {Object.keys(filteredDistribuidores).length}
              </div>
              <div className="text-sm text-gray-600">Localidades</div>
            </div>
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
                <p>23</p>
              </div>
              <div className="text-sm text-gray-600">Provincias</div>
            </div>
          </div>
        </div>

        {/* Lista de distribuidores */}
        <div className="space-y-6">
          {Object.keys(filteredDistribuidores).length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No se encontraron distribuidores
              </h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ) : (
            Object.entries(filteredDistribuidores).map(
              ([localidad, distribuidoresList]) => (
                <LocalidadSection
                  key={localidad}
                  localidad={localidad}
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
