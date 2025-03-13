import React from 'react';
import './genericHero.css';

export default function GenericHero({ titleHero }) {
  return (
    <div className="p-[var(--padding-generico-x-y)] hero mt-10 ">
      <h2 className="h2-hero-title text-center">We are light</h2>
      <h1 className="sub-title-hero">{titleHero}</h1>
    </div>
  );
}
