'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import FooterM from '@/components/footer/footer';

const Productos = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaderOk, setloaderOk] = useState(true);

  const searchParams = useSearchParams();
  let categoria;
  if (searchParams.get('categoria')) {
    console.log(searchParams.get('categoria'));
    categoria = searchParams.get('categoria').toLowerCase();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);
      const data1 = await res.json();
      const data = data1.products;
      setOriginalProducts(data);
      setloaderOk(false);
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

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          {originalProducts && !loaderOk ? (
            products.map((el, i) =>
              el.modelos
                ? el.modelos.map((imagen) =>
                    imagen.foto_portada ? (
                      <div
                        key={`${i}_${imagen.id}`}
                        className="container-items group transform transition-transform duration-300 group-hover:scale-100 rounded-3xl"
                      >
                        <Link href={`/productos/${el.categoria}/${el._id}`}>
                          <div className="relative container-img-g transform transition-transform duration-300 group-hover:scale-100 rounded-3xl">
                            <Image
                              key={imagen.id}
                              src={`${imagen.foto_portada}`}
                              alt={imagen.subnombre}
                              fill
                              className="img-class rounded-3xl"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="mask rounded-3xl"></div>
                            <h2 className="title-gallery">
                              {imagen.subnombre}
                            </h2>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div
                        key={`${i}_${imagen.id}`}
                        className="container-items group transform transition-transform duration-300 group-hover:scale-100 rounded-3xl"
                      >
                        <Link href={`/productos/${el.categoria}/${el._id}`}>
                          <div className="relative container-img-g transform transition-transform duration-300 group-hover:scale-100">
                            <Image
                              key={imagen.id}
                              src={`https://images.smartcloudstudio.com/gsg/fotos_blanco/${el.categoria.toLowerCase()}/${imagen.fotos_producto}`}
                              alt={el._id}
                              fill
                              className="img-class rounded-3xl"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 100vw"
                            />
                            <div className="mask"></div>
                            <h2 className="title-gallery">{el.nombre}</h2>
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
      <FooterM />
    </>
  );
};

export default Productos;
