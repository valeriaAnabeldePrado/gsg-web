'use client';
import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { provincias } from './utils/provincias';

const MapSection = () => {
  const [mapUrl, setMapUrl] = useState(provincias[0].url);
  const [selectedProvince, setSelectedProvince] = useState(
    provincias[0].nombre,
  );

  const handleProvinceChange = (provinciaNombre) => {
    const selectedProvince = provincias.find(
      (provincia) => provincia.nombre === provinciaNombre,
    );
    if (selectedProvince) {
      setMapUrl(selectedProvince.url);
      setSelectedProvince(provinciaNombre);
    }
  };

  return (
    <div id="mapa-distribuidores" className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header del Mapa */}
        <div className="text-center mb-12">
          <h2 className="h2-hero-title md:text-4xl font-bold text-gray-900 mb-4">
            Mapa de Distribuidores
          </h2>
          <p className="text-lg mt-10 text-gray-600 max-w-3xl mx-auto">
            Explora nuestra red de distribuidores en el mapa interactivo.
            Selecciona una provincia para ver los puntos de venta en esa región.
          </p>
        </div>

        {/* Filtro de Provincia Mejorado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="max-w-md mx-auto">
            <label
              htmlFor="province-select"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Selecciona una provincia para ver en el mapa:
            </label>

            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <div>
                    <MenuButton className="inline-flex w-full justify-between items-center bg-white rounded-xl p-4 text-lg font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors">
                      <span>{selectedProvince}</span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={`size-6 text-red-600 transition-transform ${open ? 'rotate-180' : ''}`}
                      />
                    </MenuButton>
                  </div>

                  {open && (
                    <MenuItems
                      static
                      className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none max-h-96 overflow-y-auto"
                    >
                      <div className="p-2">
                        {provincias.map((provincia) => (
                          <MenuItem key={provincia.nombre} as="div">
                            {({ close }) => (
                              <button
                                className={`w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                                  selectedProvince === provincia.nombre
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-gray-700'
                                }`}
                                onClick={() => {
                                  handleProvinceChange(provincia.nombre);
                                  close();
                                }}
                              >
                                {provincia.nombre}
                              </button>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  )}
                </>
              )}
            </Menu>
          </div>
        </div>

        {/* Mapa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <iframe
            className="w-full h-[600px] md:h-[700px]"
            src={mapUrl}
            title="Mapa de Distribuidores GSG"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default MapSection;
