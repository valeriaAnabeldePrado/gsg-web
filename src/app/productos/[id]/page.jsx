"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Measure from "@/app/productos/[id]/measure";

import "../productosSection.css";
import LoaderP from "@/components/loader/loagerP";

export default function page({ params }) {
  const [product, setProduct] = useState("");
  const [categoria, setcategoria] = useState("");

  const { id } = params;

  useEffect(() => {
    const asl = async () => {
      const res = await fetch(`/api/product?id=${id}`);
      const data1 = await res.json();
      if (data1.product) {
        const productReceived = data1.product;
        setProduct(productReceived);
        console.log("NO LLEGO", data1.product);
        setcategoria(productReceived.categoria);
        console.log("receipt", productReceived);
      } else {
        console.log("No se encontró el producto");
      }
    };
    asl();
  }, [id]);

  return (
    <>
      {categoria ? (
        <div className="w-full h-[40vh] bg-slate-900 relative overflow-hidden">
          <div className=" w-full h-full relative ">
            <Image
              src={`/portadas/${categoria}.png`}
              alt={`${categoria}`}
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <LoaderP />
      )}
      {product && (
        <div className="p-6 md:p-10 flex gap-10 flex-col container-producto">
          <section className="flex flex-wrap gap-10  ">
            <div className="flex-1 min-w-96 flex flex-col">
              <h3 className="h2-page-product">{product.nombre}</h3>
              <p className=" p-text-product">{product.descripcion}</p>
            </div>
            <div className="flex-1 min-w-96 relative h-[400px] rounded-lg">
              <Image
                fill
                src={`https://images.smartcloudstudio.com/gsg/${product.code}.png`}
                alt={product.nombre}
                className="object-cover rounded-xl"
              />
            </div>
          </section>
          <section className="h-96 w-full bg-white relative rounded-xl">
            <Image
              fill
              src={product.img.prod1}
              alt={product.nombre}
              className="img-page-pruct m-auto"
            />
          </section>
          <section className="flex flex-contain">
            <h3 className="h2-page-product">Caracteristicas</h3>
          </section>
          <div className="flex gap-4 flex-col">
            <h2 className=" p-text-product text-stone-900 bg-slate-200 rounded-xl text-p">
              Descripcion tecnica
            </h2>
            <Measure product={product} />
          </div>
        </div>
      )}
    </>
  );
}
