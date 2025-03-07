import React from 'react';
import './genericHero.css';

export default function GenericHero() {
  return (
    <div className="p-[var(--padding-generico-x-y)] hero mt-10">
      <h2>We are light</h2>
      <h1 className="text-[var(--text-grande)] text-gray-800 font-bold">
        CONOCÉ MÁS DE NUESTRA EMPRESA
      </h1>
    </div>
  );
}
