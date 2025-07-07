'use client';
import React from 'react';

const FloatingMapButton = () => {
  const scrollToMap = () => {
    document.getElementById('mapa-distribuidores').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      {/* Botón para desktop - esquina inferior derecha */}
      <button
        onClick={scrollToMap}
        className="hidden md:flex fixed right-6 bottom-6 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        aria-label="Ver mapa de distribuidores"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Ver mapa</span>
          <svg
            className="w-4 h-4 animate-bounce group-hover:animate-none transition-transform group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </button>

      {/* Botón para móvil - debajo del menú */}
      <button
        onClick={scrollToMap}
        className="md:hidden fixed right-4 top-20 z-50 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        aria-label="Ver mapa de distribuidores"
      >
        <svg
          className="w-5 h-5 animate-bounce group-hover:animate-none transition-transform group-hover:translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </>
  );
};

export default FloatingMapButton;
