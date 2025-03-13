'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './productosSection.css';

const Productos = () => {
  const [accessories, setAccessories] = useState([]);
  const [description, setDescription] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accessories`);
      const data1 = await res.json();
      const acces = [
        ...data1.accesorios[0].modelos,
        ...data1.accesorios[1].modelos,
        ...data1.accesorios[2].modelos,
      ];
      const desc = data1.accesorios[0].descripcion;
      setDescription(desc);
      console.log(acces);
      setAccessories(acces);

      setLoader(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          <div className="p-text-product-description p-8 text-center w-full items-center flex justify-center flex-col-reverse ">
            <h3 className=" md:w-10/12 ">{description}</h3>
            <h2 className="h2-hero-title text-center">Accesorios</h2>
          </div>
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
                        src={`https://images.smartcloudstudio.com/gsg/fotos_blanco/accesorios/${el.id}.jpg`}
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
