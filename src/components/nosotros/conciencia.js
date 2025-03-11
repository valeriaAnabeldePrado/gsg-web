import React from 'react';
import './nosotros.css';

function SustainabilityCircles() {
  return (
    <div className="flex justify-center items-center space-x-6 md:space-x-12 responsive-container-circle">
      {['Reducir', 'Reutilizar', 'Reciclar'].map((text) => (
        <div
          key={text}
          className="width-circle flex items-center justify-center bg-gray-300 rounded-full text-center text-gray-700 font-medium transition-all duration-500 hover:animate-pulse md:text-2xl"
        >
          <h2 className="text-nuestra">{text}</h2>
        </div>
      ))}
    </div>
  );
}

export default function Conciencia() {
  return (
    <div className="p-[var(--padding-generico-x-y)] hero">
      <h2 className="text-[var(--text-grande)] text-center h2-title-nos">
        Conciencia ambiental
      </h2>
      {SustainabilityCircles()}
    </div>
  );
}
