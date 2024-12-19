"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FooterM from "@/components/footer/footer";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "./productosSection.css";
import LoaderP from "@/components/loader/loagerP";

const Productos = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaderOk, setloaderOk] = useState(true);

  const searchParams = useSearchParams();
  let categoria;
  if (searchParams.get("categoria")) {
    categoria = searchParams.get("categoria").toLowerCase();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);
      const data1 = await res.json();
      const data = data1.products;
      const filteredData = data.filter(
        (product) => product.img && (product.img.prod1 || product.img.prod2)
      );
      setOriginalProducts(filteredData);
      setProducts(filteredData);
      const timer = setTimeout(() => {
        setloaderOk(false);
      }, 1000);

      return () => clearTimeout(timer);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoria === "todos" || !categoria) {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter(
        (product) => product.categoria === categoria
      );
      setProducts(filteredProducts);
    }
  }, [categoria, originalProducts]);

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap  w-full">
          {products && !loaderOk ? (
            products.map((el, i) => {
              return (
                <div key={`${el.nombre}_ ${i}`} className={`container-items `}>
                  <Link href={`/productos/${el._id}`}>
                    <div className="relative container-img-g">
                      <Image
                        src={`https://images.smartcloudstudio.com/gsg/${el.code}.png`}
                        alt={el._id}
                        fill
                        className="img-class"
                      />
                      <div className="mask"></div>
                      <h2 className="title-gallery">{el.nombre}</h2>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <LoaderP />
          )}
        </section>
        <FooterM />
      </div>
    </>
  );
};

export default Productos;
