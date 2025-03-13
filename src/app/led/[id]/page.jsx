'use client';

import { useEffect, useState } from 'react';
import Measure from './measure';
import Image from 'next/image';
// import '../../productosSection.css';

export default function page({ params }) {
  const [led, setLed] = useState([]);
  const [loader, setLoader] = useState(true);
  const { id } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accessories`);
      const data1 = await res.json();
      const leds = data1.accesorios[3].modelos;

      const filteredData = leds.filter((el) => el.id === id);
      setLed(filteredData[0]);
      setLoader(false);
    };

    fetchProducts();
  }, []);

  console.log(led);
  return (
    <>
      {led ? (
        <div className="p-6 md:p-10 flex gap-10 flex-col container-producto ">
          <section className="flex flex-wrap gap-10 padding-container-top">
            <div className="flex-1 min-w-72 flex flex-col">
              <h3 className="h2-page-product">{led.subnombre}</h3>
              <p className="p-text-product-description">{led.description}</p>
            </div>
            <div className="flex-1 min-w-72 relative aspect-square rounded-lg overflow-hidden">
              <Image
                fill
                src={`https://images.smartcloudstudio.com/gsg/fotos_blanco/led/${led.id}.jpg`}
                alt={led.id}
                className="object-cover"
              />
            </div>
          </section>
          <section>
            <section className="flex flex-contain">
              <h3 className="h2-page-product mb-5">Caracteristicas</h3>
            </section>
            <div className="flex gap-4 flex-col">
              <h2 className=" p-text-product  text-p">Descripcion tecnica</h2>
              <Measure product={led} />
            </div>
          </section>
        </div>
      ) : (
        <h1>cargando...</h1>
      )}
    </>
  );
}
