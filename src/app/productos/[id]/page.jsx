"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Measure from "@/components/measure";

export default function page({ params }) {
  const [product, setProduct] = useState();
  const [categoria, setcategoria] = useState("");

  const { id } = params;

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/product?id=${id}`);
      const data1 = await res.json();
      console.log("datita recibida", data1);
      const productReceived = data1.product;
      setProduct(productReceived);
      const cat = productReceived.categoria.toLowerCase();
      setcategoria(cat);
      console.log(categoria);
    })();
  }, []);

  return (
    <>
      <div className="w-full h-[30vh] bg-green-200 relative">
        {categoria ? (
          <div className="h-full w-full relative">
            <Image
              src={`/portadas/${categoria}.png`}
              alt={`${categoria}`}
              layout="fill"
              className="object-cover"
            />
          </div>
        ) : (
          "loading..."
        )}
      </div>
      {product && (
        <div className="p-6 md:p-10 flex gap-10 flex-col">
          <section className="flex flex-wrap gap-10  ">
            <div className="flex-1 min-w-96 flex flex-col">
              <h3>{product.nombre}</h3>
              <p className="lg:max-w-[60%]">{product.descripcion}</p>
            </div>
            <div className="flex-1 min-w-96 relative h-[400px]">
              <Image
                fill
                src={product.img.prod1}
                alt={product.nombre}
                className="object-cover"
              />
            </div>
          </section>
          <section className="flex flex-contain">
            <h3>Caracteristicas</h3>
          </section>
          <div className="flex gap-4 flex-col">
            <h2>Descripcion tecnica</h2>
            <Measure product={product} />
          </div>
        </div>
      )}
    </>
  );
}
