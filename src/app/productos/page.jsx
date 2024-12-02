"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./productosSection.css";
import FooterM from "@/components/footer/footer";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Productos = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
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
      setProducts(filteredData); // Inicializa con todos los productos
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
      <div className="">
        <section className="flex items-center justify-center flex-wrap">
          {products &&
            products.map((el, i) => {
              return (
                <Link key={`${el.nombre}_ ${i}`} href={`/productos/${el._id}`}>
                  <h2>{el.nombre}</h2>
                  <Image
                    src={el.img.prod1}
                    height={400}
                    width={400}
                    alt={el._id}
                    className="h-full w-auto"
                  />
                </Link>
              );
            })}
        </section>
        <FooterM />
      </div>
    </>
  );
};

export default Productos;
