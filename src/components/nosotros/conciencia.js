import React from 'react';
import './nosotros.css';

function SustainabilityCircles() {
  return (
    <div className="flex justify-center items-center space-x-6 md:space-x-12">
      {['Reducir', 'Reutilizar', 'Reciclar'].map((text) => (
        <div
          key={text}
          className="md:w-60 md:h-60 w-24 h-24 flex items-center justify-center bg-gray-300 rounded-full text-center text-gray-700 font-medium transition-all duration-500 hover:animate-pulse md:text-2xl"
        >
          {text}
        </div>
      ))}
    </div>
  );
}

export default function Conciencia() {
  return (
    <div className="p-[var(--padding-generico-x-y)] hero">
      <h2 className="text-[var(--text-grande)] text-center text-gray-800 font-bold">
        CONCIENCIA AMBIENTAL
      </h2>
      {SustainabilityCircles()}
    </div>
  );
}
