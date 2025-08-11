import CatalogoHome from '@/components/catalogo-home/catalogoHome';
import FooterM from '@/components/footer/footer';
import Hero from '@/components/hero/hero';
import NuestraEmp from '@/components/nuestraEmp/nuestraEmpresa';
import FeaturedProducts from '@/components/home/FeaturedProducts';

import WhyChooseUs from '@/components/home/WhyChooseUs';

import React from 'react';

const HomeM = () => {
  return (
    <>
      <div className="heroDesk-pin">
        <Hero />
      </div>
      <NuestraEmp />
      <FeaturedProducts />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <WhyChooseUs />
      </div>
      <div className="portadaDos"></div>
      <CatalogoHome />
      <FooterM />
    </>
  );
};

export default HomeM;
