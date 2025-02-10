import Conciencia from '@/components/nosotros/conciencia';
import First from '@/components/nosotros/first';
import Hero from '@/components/nosotros/hero';
import Second from '@/components/nosotros/second';
import React from 'react';

const Nosotros = () => {
  return (
    <div className="p-[var(--padding-generico-x-y-pages-top)] ">
      <Hero />
      <First />
      <Second />
      <Conciencia />
    </div>
  );
};

export default Nosotros;
