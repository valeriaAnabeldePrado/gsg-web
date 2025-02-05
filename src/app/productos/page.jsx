'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';

const Productos = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaderOk, setloaderOk] = useState(true);

  const searchParams = useSearchParams();
  let categoria;
  if (searchParams.get('categoria')) {
    categoria = searchParams.get('categoria').toLowerCase();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);

      const data1 = await res.json();
      const data = data1.products;

      setOriginalProducts(data);

      const timer = setTimeout(() => {
        setloaderOk(false);
      }, 300);

      return () => clearTimeout(timer);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoria === 'todos' || !categoria) {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter(
        (product) => product.categoria.toLowerCase() === categoria,
      );

      setProducts(filteredProducts);
    }
  }, [categoria, originalProducts]);
  console.log(products);

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap  w-full responsive-container">
          {originalProducts && !loaderOk ? (
            products.map((el, i) =>
              el.modelos
                ? el.modelos.map(
                    (imagen) =>
                      imagen.id && (
                        <div
                          key={`${i}_${imagen.id}`}
                          className="container-items"
                        >
                          <Link href={`/productos/${el.categoria}/${el._id}`}>
                            <div className="relative container-img-g">
                              <Image
                                key={imagen.id}
                                src={`https://images.smartcloudstudio.com/gsg/${imagen.id}.png`}
                                alt={el._id}
                                fill
                                className="img-class"
                              />
                              <div className="mask"></div>
                              <h2 className="title-gallery">{el.categoria}</h2>
                            </div>
                          </Link>
                        </div>
                      ),
                  )
                : null,
            )
          ) : (
            <LoaderP />
          )}
        </section>
      </div>
    </>
  );
};

export default Productos;
