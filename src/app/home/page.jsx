import Carousel from "@/components/carousel/carousel";
import CatalogoHome from "@/components/catalogo-home/catalogoHome";
import CategoryList from "@/components/categoryList-home/categoryList";
import Hero from "@/components/hero/hero";
import NuestraEmp from "@/components/nuestraEmp/nuestraEmpresa";
import React from "react";

const HomeM = () => {
  return (
    <>
      <div className="heroDesk-pin">
        <Hero />
      </div>
      <NuestraEmp />
      <Carousel />
      <CatalogoHome />
    </>
  );
};

export default HomeM;
