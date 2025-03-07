'use client';
import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import FooterM from '@/components/footer/footer';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

import GenericHero from '@/components/hero/genericHero';

const words = `A través de nuestra red de distribuidores, aseguramos que nuestros productos y servicios lleguen a cada rincón, garantizando atención personalizada y calidad superior en cada interacción`;

const provincias = [
  {
    nombre: 'Argentina',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ehbc=2E312F',
  },
  {
    nombre: 'Buenos Aires',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-34.6037,-58.3816&z=8',
  },
  {
    nombre: 'Córdoba',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-31.4201,-64.1888&z=8',
  },
  {
    nombre: 'Santa Fe',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-31.5855,-60.7238&z=8',
  },
  {
    nombre: 'Mendoza',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-32.8895,-68.8458&z=8',
  },
  {
    nombre: 'Tucumán',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-26.8083,-65.2176&z=8',
  },
  {
    nombre: 'Salta',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-24.7829,-65.4122&z=8',
  },
  {
    nombre: 'Entre Ríos',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-32.0585,-59.2016&z=8',
  },
  {
    nombre: 'Chaco',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-27.4512,-58.9861&z=8',
  },
  {
    nombre: 'Corrientes',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-27.4692,-58.8306&z=8',
  },
  {
    nombre: 'Misiones',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-26.8754,-54.4587&z=8',
  },
  {
    nombre: 'San Juan',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-31.5317,-68.5256&z=8',
  },
  {
    nombre: 'San Luis',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-33.2995,-66.3398&z=8',
  },
  {
    nombre: 'La Rioja',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-29.4135,-66.8565&z=8',
  },
  {
    nombre: 'Catamarca',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-28.4696,-65.7795&z=8',
  },
  {
    nombre: 'Santiago del Estero',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-27.7824,-64.2673&z=8',
  },
  {
    nombre: 'Jujuy',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-24.1858,-65.2995&z=8',
  },
  {
    nombre: 'Formosa',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-26.1775,-58.1781&z=8',
  },
  {
    nombre: 'La Pampa',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-36.6167,-64.2833&z=8',
  },
  {
    nombre: 'Neuquén',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-38.9516,-68.0591&z=8',
  },
  {
    nombre: 'Río Negro',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-40.8135,-63.0026&z=8',
  },
  {
    nombre: 'Chubut',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-43.3002,-65.1023&z=8',
  },
  {
    nombre: 'Santa Cruz',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-48.6226,-69.2181&z=8',
  },
  {
    nombre: 'Tierra del Fuego',
    url: 'https://www.google.com/maps/d/embed?mid=1J0tpWPg0p5t3QT8peDOo0UOrrwVqQcUj&ll=-54.8069,-68.3073&z=8',
  },
];

const Distribuidores = () => {
  const [mapUrl, setMapUrl] = useState(provincias[0].url);

  const handleProvinceChange = (provinciaNombre) => {
    const selectedProvince = provincias.find(
      (provincia) => provincia.nombre === provinciaNombre,
    );
    if (selectedProvince) {
      setMapUrl(selectedProvince.url);
    }
  };

  return (
    <>
      <div className="p-[var(--padding-generico-x-y)]">
        <GenericHero />
        <div className="flex p-[var(--padding-generico-y)]">
          <TextGenerateEffect
            words={words}
            duration={0.1}
            className="flex-1 md:max-w-[80%]"
          />
        </div>

        <div className="w-full max-w-[1000px] flex justify-center m-auto flex-col gap-8">
          <div className="mb-4 ">
            <label
              htmlFor="province"
              className="block font-medium text-gray-700 text-2xl mb-5"
            >
              Selecciona una provincia:
            </label>

            <Menu as="div" className="relative dropdown">
              {({ open }) => (
                <>
                  <div>
                    <MenuButton className="inline-flex w-full justify-between gap-x-1.5 bg-white rounded-xl p-4 text-2xl font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50">
                      {provincias.find((provincia) => provincia.url === mapUrl)
                        ?.nombre || 'Selecciona una provincia'}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-7 text-red-600"
                      />
                    </MenuButton>
                  </div>

                  {open && (
                    <MenuItems
                      static
                      className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none max-h-96 overflow-y-auto"
                    >
                      <ul className="p-2">
                        {provincias.map((provincia) => (
                          <MenuItem key={provincia.nombre} as="div">
                            {({ close }) => (
                              <div
                                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                onClick={() => {
                                  handleProvinceChange(provincia.nombre);
                                  close();
                                }}
                              >
                                {provincia.nombre}
                              </div>
                            )}
                          </MenuItem>
                        ))}
                      </ul>
                    </MenuItems>
                  )}
                </>
              )}
            </Menu>
          </div>

          <iframe
            className="md:block  rounded-2xl  w-full"
            src={mapUrl}
            width="1000"
            height="630"
          ></iframe>
        </div>
      </div>

      <FooterM />
    </>
  );
};

export default Distribuidores;
