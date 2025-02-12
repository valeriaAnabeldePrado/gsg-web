import CatalogoHome from '@/components/catalogo-home/catalogoHome';
import FooterM from '@/components/footer/footer';
import Hero from '@/components/hero/hero';
import NuestraEmp from '@/components/nuestraEmp/nuestraEmpresa';
import React from 'react';

const HomeM = () => {
  return (
    <>
      <div className="heroDesk-pin">
        <Hero />
      </div>
      <NuestraEmp />
      <div className="portadaDos"></div>
      <CatalogoHome />
      <FooterM />
    </>
  );
};

export default HomeM;
