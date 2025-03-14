'use client';

import { useEffect, useState } from 'react';
import Measure from './measure';
import Image from 'next/image';
// import '../../productosSection.css';

export default function page({ params }) {
  const [accessories, setAccessories] = useState([]);
  const [loader, setLoader] = useState(true);
  const { id } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accessories`);
      const data1 = await res.json();
      const acces = [
        ...data1.accesorios[0].modelos,
        ...data1.accesorios[1].modelos,
        ...data1.accesorios[2].modelos,
      ];
      const filteredData = acces.filter((el) => el.id === id);
      setAccessories(filteredData[0]);
      setLoader(false);
    };

    fetchProducts();
  }, []);

  console.log(accessories);
  return (
    <>
      {accessories ? (
        <div className="p-6 md:p-10 flex gap-10 flex-col container-producto ">
          <section className="flex flex-wrap gap-10 padding-container-top">
            <div className="flex-1 min-w-72 flex flex-col">
              <h3 className="h2-page-product">{accessories.subnombre}</h3>
              <p className="p-text-product-description">
                {accessories.description}
              </p>
            </div>
            <div className="flex-1 min-w-72 relative aspect-square rounded-lg overflow-hidden">
              <Image
                fill
                src={`https://images.smartcloudstudio.com/gsg/fotos_blanco/accesorios/${accessories.id}.jpg`}
                alt={accessories.id}
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
              <Measure product={accessories} />
            </div>
          </section>
        </div>
      ) : (
        <h1>cargando...</h1>
      )}
    </>
  );
}
