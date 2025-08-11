import Conciencia from '@/components/nosotros/conciencia';
// import First from '@/components/nosotros/first';
// import Second from '@/components/nosotros/second';
import React from 'react';
import FooterM from '@/components/footer/footer';
import GenericHero from '@/components/hero/genericHero';
import First from '@/components/nosotros/first';
import Second from '@/components/nosotros/second';

const Nosotros = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="p-[var(--padding-generico-x-y)]">
          <GenericHero titleHero={'NUESTRA EMPRESA'} />
        </div>
      </div>

      {/* Content Sections */}
      <First />
      <Second />
      <Conciencia />

      <FooterM />
    </>
  );
};

export default Nosotros;
