import Conciencia from '@/components/nosotros/conciencia';
import First from '@/components/nosotros/first';
import Second from '@/components/nosotros/second';
import React from 'react';
import FooterM from '@/components/footer/footer';
import GenericHero from '@/components/hero/genericHero';

const Nosotros = () => {
  return (
    <>
      <div className="p-[var(--padding-generico-x-y)] ">
        <GenericHero titleHero={'NUESTRA EMPRESA'} />
        <First />
        <Second />
        <Conciencia />
      </div>
      <FooterM />
    </>
  );
};

export default Nosotros;
