'use client';
import { useState } from 'react';
import { luces } from '../../utils/data';
import Image from 'next/image';
import { IMG_URL } from '@/utils/constants';
import Link from 'next/link';
import '../home/home.css';

export default function CategoryList() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Combinar todas las categorías incluyendo accesorios
  const allCategories = [
    ...luces.filter((luz) => luz), // Filtrar elementos undefined
    {
      title: 'Accesorios',
      categoria: 'accesorios',
      src: 'Accesorios.png',
    },
  ];

  return (
    <section className="relative text-black overflow-hidden pt-20 pb-16">
      {/* Header */}
      <div className="relative z-10 text-center py-12 px-4">
        <h2 className="titulo-1 text-black">Explora nuestro universo</h2>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"></div>
        <p className="max-w-2xl mx-auto text-black">
          Cada categoría cuenta una historia de luz, diseño e innovación
        </p>
      </div>

      {/* Split screen principal */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 p-[var(--padding-generico-x-y)]">
        {/* Panel izquierdo - Lista interactiva */}
        <div className="relative flex flex-col justify-center p-6 lg:p-12">
          <div className="space-y-10">
            {allCategories.map((categoria, index) => {
              const isHovered =
                hoveredCategory?.categoria === categoria.categoria;
              const linkHref =
                categoria.categoria === 'accesorios'
                  ? '/accesorios'
                  : `/productos?categoria=${categoria.categoria}`;

              return (
                <Link key={index} href={linkHref}>
                  <div
                    className="group relative cursor-pointer"
                    onMouseEnter={() => setHoveredCategory(categoria)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {/* Línea animada */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600 transition-all duration-500 ${
                        isHovered
                          ? 'opacity-100 scale-y-100'
                          : 'opacity-50 scale-y-50'
                      }`}
                    ></div>

                    {/* Contenido */}
                    <div className="pl-6 py-6 relative overflow-hidden">
                      {/* Número del índice */}
                      <span
                        className={`absolute -left-1 top-0 text-4xl font-bold transition-all duration-500 ${
                          isHovered
                            ? 'text-red-500 opacity-100'
                            : 'text-black opacity-30'
                        }`}
                        style={{ fontFamily: 'var(--tipo-fuente)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Título */}
                      <h3
                        className={`font-bold transition-all duration-500 relative z-10 ${
                          isHovered
                            ? 'text-red-500 scale-105 translate-x-2'
                            : 'text-black'
                        }`}
                      >
                        {categoria.title.toUpperCase()}
                      </h3>

                      {/* Descripción que aparece en hover */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isHovered
                            ? 'max-h-16 opacity-100 mt-1'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p
                          className="text-black text-sm"
                          style={{
                            fontFamily: 'var(--tipo-fuente)',
                          }}
                        >
                          {categoria.categoria === 'accesorios'
                            ? 'Complementos perfectos para tu instalación'
                            : `Descubre nuestra selección de iluminación ${categoria.title.toLowerCase()}`}
                        </p>
                      </div>

                      {/* Flecha animada */}
                      <div
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                          isHovered
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-4 opacity-0'
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-red-500"
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
                      </div>

                      {/* Efecto de brillo */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                          isHovered
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

        {/* Panel derecho - Imagen inmersiva */}
        <div className="relative overflow-hidden">
          {/* Estado por defecto */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              !hoveredCategory ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center">
              <p
                className="text-black text-lg"
                style={{ fontFamily: 'var(--tipo-fuente)' }}
              >
                Selecciona una categoría
              </p>
            </div>
          </div>

          {/* Imágenes de categorías */}
          {allCategories.map((categoria, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                hoveredCategory?.src === categoria.src
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-110'
              }`}
            >
              {hoveredCategory?.src === categoria.src && (
                <div className="relative w-full h-full flex flex-col items-center justify-center px-8 rounded-2xl  shadow-lg npm ">
                  {/* Decoración alrededor de la tarjeta */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-red-500 opacity-50 animate-pulse"></div>

                  {/* Imagen principal */}
                  <div className="relative max-w-[600px] max-h-[450px] w-full h-full overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={`${IMG_URL}/${categoria.src}`}
                      alt={categoria.title}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
