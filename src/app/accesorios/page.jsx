'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './productosSection.css';

const Productos = () => {
  const [accessories, setAccessories] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accessories`);
      const data1 = await res.json();
      const acces = data1.accesorios[0].modelos;
      setAccessories(acces);

      setLoader(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          {!loader
            ? accessories.map((el, i) => (
                <div
                  key={`${i}_${el.id}`}
                  className="container-items group transform transition-transform duration-300 group-hover:scale-100 rounded-3xl"
                >
                  <Link href={`/accesorios/${el.id}`}>
                    <div className="relative container-img-g transform transition-transform duration-300 group-hover:scale-100 rounded-3xl">
                      <Image
                        key={el.id}
                        src="https://gsgdesign.com.ar/bbd/fotos_prod/accesorios/amp-24w-prin.jpg"
                        alt={el.subnombre}
                        fill
                        className="img-class rounded-3xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="mask rounded-3xl"></div>
                      <h2 className="title-gallery">{el.subnombre}</h2>
                    </div>
                  </Link>
                </div>
              ))
            : 'cargando...'}
        </section>
      </div>
    </>
  );
};

export default Productos;
