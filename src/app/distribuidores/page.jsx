'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import FooterM from '@/components/footer/footer';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import HeroBlack from '@/components/hero/hero-black';

const words = `A través de nuestra red de distribuidores, aseguramos que nuestros productos y servicios lleguen a cada rincón, garantizando atención personalizada y calidad superior en cada interacción`;

// URLs del iframe para cada provincia
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

  // Manejar el cambio de provincia
  const handleProvinceChange = (event) => {
    const selectedProvince = provincias.find(
      (provincia) => provincia.nombre === event.target.value,
    );
    if (selectedProvince) {
      setMapUrl(selectedProvince.url);
    }
  };

  return (
    <>
      <div className="p-[var(--padding-generico-x-y)]">
        <HeroBlack title="Distribuidores" />
        <div className="flex p-[var(--padding-generico-y)]">
          <TextGenerateEffect
            words={words}
            duration={0.1}
            className="flex-1 md:max-w-[80%]"
          />
          <div className="rounded-full bg-green-200 h-24 w-24"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[1000px]">
            {/* Selector de provincias */}
            <div className="mb-4 ">
              <label
                htmlFor="province"
                className="block font-medium text-gray-700 text-2xl"
              >
                Selecciona una provincia:
              </label>
              <select
                id="province"
                onChange={handleProvinceChange}
                className="text-2xl mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                {provincias.map((provincia) => (
                  <option key={provincia.nombre} value={provincia.nombre}>
                    {provincia.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Mapa de Google (iframe) */}
            <iframe
              className="md:block hidden rounded-2xl mapa-resp"
              src={mapUrl}
              width="1000"
              height="630"
            ></iframe>
            <iframe
              className="md:hidden rounded-2xl mapa-resp"
              src={mapUrl}
              width="350"
              height="630"
            ></iframe>
          </div>
        </div>
      </div>
      <FooterM />
    </>
  );
};

export default Distribuidores;
