'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './home.css';
import Link from 'next/link';

// Datos estáticos de productos destacados
const featuredProducts = [
  {
    id: '689651916d06006b93a5a929',
    titulo: 'Perfil mini PE',
    foto: 'https://images.smartcloudstudio.com/gsg/mini-pe.png',
    link: '/productos/Perfiles/689651916d06006b93a5a929',
  },
  {
    id: 'led-cob-10w',
    titulo: 'Led COB',
    foto: 'https://images.smartcloudstudio.com/gsg/fotos_blanco/led/led-cob-10w.jpg',
    link: '/led/led-cob-10w',
  },
  {
    id: '67bb9c6836f7ed30e4282b82',
    titulo: 'Aplique de pared',
    foto: 'https://images.smartcloudstudio.com/gsg/wal-600.png',
    link: '/productos/Sensores/sensor-doble-door',
  },
];

export default function FeaturedProducts() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background con líneas diagonales */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full  transform skew-y-6"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header creativo */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <span
              className="block text-sm font-medium tracking-widest uppercase mb-4 opacity-60"
              style={{
                fontFamily: 'var(--tipo-fuente)',
                color: 'var(--color-fuente-grey)',
                letterSpacing: '0.2em',
              }}
            >
              Iluminacion que inspira
            </span>
            <h2
              className="titulo"
              style={{
                fontSize: 'var(--text-xxxl)',
                fontFamily: 'var(--tipo-fuente)',
                lineHeight: '1.1',
              }}
            >
              Novedades
            </h2>
            <div className="w-32 h-0.5 bg-red-500 mx-auto mt-6"></div>
          </div>
        </div>

        {/* Layout con flexbox asimétrico tipo magazine */}
        <div className="flex flex-col lg:flex-row gap-4 mb-16 h-[600px]">
          {/* Producto principal - 2/3 del ancho */}
          {featuredProducts[0] && (
            <Link
              href={featuredProducts[0].link}
              className="flex-1 lg:flex-[2]"
            >
              <div
                className="group relative w-full h-full overflow-hidden cursor-pointer transition-all duration-700 rounded-lg"
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Imagen principal */}
                <div className="relative w-full h-full overflow-hidden bg-gray-200">
                  <div
                    className={`relative w-full h-full transform transition-all duration-700 ${
                      hoveredIndex === 0 ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    {featuredProducts[0].foto && (
                      <Image
                        src={featuredProducts[0].foto}
                        alt={featuredProducts[0].titulo}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        priority={true}
                        onError={(e) => {
                          console.error(
                            'Error loading image:',
                            featuredProducts[0].foto,
                          );
                        }}
                      />
                    )}
                  </div>

                  {/* Overlay gradiente */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                      hoveredIndex === 0 ? 'opacity-90' : 'opacity-60'
                    }`}
                  ></div>

                  {/* Contenido flotante */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div
                      className={`transform transition-all duration-500 ${
                        hoveredIndex === 0 ? 'translate-y-0' : 'translate-y-4'
                      }`}
                    >
                      <h3
                        className="text-white titulo font-bold mb-4 text-4xl"
                        style={{ fontFamily: 'var(--tipo-fuente)' }}
                      >
                        {featuredProducts[0].titulo}
                      </h3>

                      {/* Botón CTA */}
                      <div
                        className={`transform transition-all duration-700 ${
                          hoveredIndex === 0
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-4 opacity-0'
                        }`}
                      >
                        <span className="inline-flex items-center space-x-2 text-white group-hover:text-red-300 transition-colors">
                          <span
                            className="font-medium"
                            style={{ fontFamily: 'var(--tipo-fuente)' }}
                          >
                            Explorar producto
                          </span>
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Efecto de brillo */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                      hoveredIndex === 0
                        ? 'translate-x-full opacity-100'
                        : '-translate-x-full opacity-0'
                    }`}
                  ></div>
                </div>
              </div>
            </Link>
          )}

          {/* Productos secundarios - 1/3 del ancho */}
          <div className="flex flex-col gap-4 flex-1 lg:flex-[1]">
            {featuredProducts.slice(1).map((prod, index) => {
              const actualIndex = index + 1;
              return (
                <Link key={prod.id} href={prod.link} className="flex-1">
                  <div
                    className="group relative w-full h-full overflow-hidden cursor-pointer transition-all duration-700 rounded-lg"
                    onMouseEnter={() => setHoveredIndex(actualIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Imagen principal */}
                    <div className="relative w-full h-full overflow-hidden bg-gray-200">
                      <div
                        className={`relative w-full h-full transform transition-all duration-700 ${
                          hoveredIndex === actualIndex
                            ? 'scale-110'
                            : 'scale-100'
                        }`}
                      >
                        {prod.foto && (
                          <Image
                            src={prod.foto}
                            alt={prod.titulo}
                            fill
                            className="object-cover object-center"
                            sizes="(min-width: 1024px) 33vw, 100vw"
                            priority={false}
                            onError={(e) => {
                              console.error('Error loading image:', prod.foto);
                            }}
                          />
                        )}
                      </div>

                      {/* Overlay gradiente */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                          hoveredIndex === actualIndex
                            ? 'opacity-90'
                            : 'opacity-60'
                        }`}
                      ></div>

                      {/* Contenido flotante */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div
                          className={`transform transition-all duration-500 ${
                            hoveredIndex === actualIndex
                              ? 'translate-y-0'
                              : 'translate-y-4'
                          }`}
                        >
                          <h3
                            className="text-white titulo font-bold mb-3 text-2xl"
                            style={{ fontFamily: 'var(--tipo-fuente)' }}
                          >
                            {prod.titulo}
                          </h3>

                          {/* Botón CTA */}
                          <div
                            className={`transform transition-all duration-700 ${
                              hoveredIndex === actualIndex
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-4 opacity-0'
                            }`}
                          >
                            <span className="inline-flex items-center space-x-2 text-white group-hover:text-red-300 transition-colors">
                              <span
                                className="font-medium text-sm"
                                style={{ fontFamily: 'var(--tipo-fuente)' }}
                              >
                                Explorar producto
                              </span>
                              <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Efecto de brillo */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                          hoveredIndex === actualIndex
                            ? 'translate-x-full opacity-100'
                            : '-translate-x-full opacity-0'
                        }`}
                      ></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Link href="/productos" className="relative inline-block group">
            <span className="titulo">Ver todos</span>
            <div className="absolute left-0 -bottom-2 w-16 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
