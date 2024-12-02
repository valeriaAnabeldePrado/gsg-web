import Image from "next/image";
import React from "react";
import Measure from "./components/measure";

export default function page({ params }) {
  const { id } = params;

  // const product = fetch(`/products/${id}`); esto es lo que devolveria el bdd

  const product = {
    code: "sat-s",
    category: "colgantes",
    title: "Saturno Simple",
    description:
      "Un delgado aro de aluminio nos ilumina desde su interior, como flotando en el aire gracias a sus casi imperceptibles tensores dando una imagen moderna y llamativa. Permite diferentes configuraciones al momento de instalarlo.",
    imgProudct:
      "https://gsgdesign.com.ar/bbd//fotos_prod/colgantes/sat_sim100_prin.jpg",

    caracteristicsP:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quod eveniet esse suscipit explicabo eius accusamus rem! Deserunt recusandae, necessitatibus culpa quaerat, sapiente vero omnis quidem deleniti nihil molestias alias.",
    tecnical: {
      finishes: ["Aluminio anodizado", "Negro", "Blanco", "Champagne", "Oro"],
      watt: ["26", "38", "48", "60"],
      tonos: ["Frio", "Calida", "Neutro", "Super Calida"],
      diam: [120, 80, 60, 45],
      led: true,
    },

    // variantes: [
    //   {
    //     watt: 26,
    //     kelvin: 6000,
    //     lumen: 2340,
    //     volt: 220,
    //     src: "/imagenes/galeria/img1.png",
    //     numLed: 1,
    //     large: 100,
    //     width: 100,
    //     dimension: 50,
    //     diameter: 0,
    //     led: true,
    //   },
    //   {
    //     var: 90,
    //     lum: 2500,
    //     pot: 28,
    //     src: "/imagenes/galeria/img2.png",
    //   },
    //   {
    //     var: 120,
    //     lum: 2500,
    //     pot: 28,
    //     src: "/imagenes/galeria/img3.png",
    //   },
    // ],
  };

  return (
    <div className="p-6 md:p-10 flex gap-10 flex-col">
      <section className="flex flex-wrap gap-10  ">
        <div className="flex-1 min-w-96 flex flex-col">
          <h3>{product.title}</h3>
          <p className="lg:max-w-[60%]">{product.description}</p>
        </div>
        <div className="flex-1 min-w-96 relative h-[400px]">
          {/* <Image
            fill
            src={product.imgProudct}
            alt={product.title}
            className="object-cover"
          /> */}
        </div>
      </section>
      <section className="flex flex-contain">
        <h3>Caracteristicas</h3>
        <p>{product.caracteristicsP}</p>
      </section>
      <div className="flex gap-4 flex-col">
        <h2>Descripcion tecnica</h2>
        <Measure product={product} />
      </div>
    </div>
  );
}
