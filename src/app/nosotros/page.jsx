import Conciencia from '@/components/nosotros/conciencia';
import First from '@/components/nosotros/first';
import HeroBlack from '@/components/hero/hero-black';
import Second from '@/components/nosotros/second';
import React from 'react';
import FooterM from '@/components/footer/footer';

const Nosotros = () => {
  return (
    <>
      <div className="p-[var(--padding-generico-x-y)] ">
        <HeroBlack title="We are light" />
        {/* respetar el mismo banner para las secciones, si no queda recargado */}
        <First />
        <Second />
        <Conciencia />
      </div>
      <FooterM />
    </>
  );
};

export default Nosotros;
