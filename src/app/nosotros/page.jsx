import Conciencia from '@/components/nosotros/conciencia';
import First from '@/components/nosotros/first';
import HeroNosotros from '@/components/nosotros/hero';
import Second from '@/components/nosotros/second';
import React from 'react';
import FooterM from '@/components/footer/footer';

const Nosotros = () => {
  return (
    <>
      <div className="p-[var(--padding-generico-x-y)] ">
        <HeroNosotros />

        <First />
        <Second />
        <Conciencia />
      </div>
      <FooterM />
    </>
  );
};

export default Nosotros;
