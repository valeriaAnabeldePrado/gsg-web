'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import FooterM from '@/components/footer/footer';

const Productos = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accesorios`);
      const data1 = await res.json();
      console.log(data1);
      const data = data1.accessories;
      setAccessories(data);
      setloaderOk(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          {originalProducts && !loaderOk ? (
            accessories.map((el, i) =>
              el.modelos.map((modelo, j) =>
                modelo.foto_portada ? (
                  <div
                    key={`${i}_${j}_${modelo.id}`}
                    className="container-items group transform transition-transform duration-300 group-hover:scale-100 rounded-3xl"
                  >
                    <Link href={`/accesorios/${el._id}`}>
                      <div className="relative container-img-g transform transition-transform duration-300 group-hover:scale-100 rounded-3xl">
                        <Image
                          key={modelo.id}
                          src={`${modelo.foto_portada}`}
                          alt={modelo.subnombre}
                          fill
                          className="img-class rounded-3xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="mask rounded-3xl"></div>
                        <h2 className="title-gallery">{modelo.subnombre}</h2>
                      </div>
                    </Link>
                  </div>
                ) : null,
              ),
            )
          ) : (
            <LoaderP />
          )}
        </section>
      </div> */}
      <FooterM />
    </>
  );
};

export default Productos;
