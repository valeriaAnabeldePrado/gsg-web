"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Measure from "@/app/productos/[id]/measure";
import LoaderP from "@/components/loader/loagerP";
import "../productosSection.css";

export default function page({ params }) {
  const [product, setProduct] = useState("");
  const [categoria, setcategoria] = useState("");
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);

  const { id } = params;

  useEffect(() => {
    const asl = async () => {
      const res = await fetch(`/api/product?id=${id}`);
      const data1 = await res.json();
      if (data1.product) {
        const productReceived = data1.product;
        setProduct(productReceived);
        setcategoria(productReceived.categoria);
        //console.log("receipt", productReceived);
      } else {
        console.log("No se encontró el producto");
      }
    };
    asl();
  }, [id]);

  const handleModelChange = (index) => {
    setSelectedModelIndex(index);
  };
  return (
    <>
      {product ? (
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

          <div className="flex gap-4 justify-center">
            {product.modelos.map((modelo, index) => (
              <button
                key={modelo.id}
                onClick={() => handleModelChange(index)}
                className={`px-4 py-2 rounded-lg ${
                  selectedModelIndex === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                {modelo.subnombre}
              </button>
            ))}
          </div>

          {product.modelos[selectedModelIndex] && (
            <section>
              <section className="h-96 w-full bg-white relative rounded-xl">
                <Image
                  fill
                  src={product.modelos[selectedModelIndex].fotos_producto}
                  alt={product.modelos[selectedModelIndex].id}
                  className="img-page-pruct m-auto"
                />
                <h3>{product.modelos[selectedModelIndex].subnombre}</h3>
              </section>
              <section className="flex flex-contain">
                <h3 className="h2-page-product">Caracteristicas</h3>
              </section>
              <div className="flex gap-4 flex-col">
                <h2 className=" p-text-product text-stone-900 bg-slate-200 rounded-xl text-p">
                  Descripcion tecnica
                </h2>
                <Measure
                  product={{
                    ...product,
                    productCharacteristics:
                      product.modelos[selectedModelIndex]
                        .caracteristicasTecnicas,
                  }}
                />
              </div>
            </section>
          )}
        </div>
      ) : (
        <LoaderP />
      )}
    </>
  );
}
