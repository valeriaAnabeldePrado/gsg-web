'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Measure from './measure';
// import '../../productosSection.css';

export default function page({ params }) {
  const [accessories, setAccessories] = useState([]);
  const [loader, setLoader] = useState(true);
  const { id } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accessories`);
      const data1 = await res.json();
      const data = data1.accesorios[0].modelos;
      const filteredData = data.filter((el) => el.id === id);
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
                Accesorios informacion para agregar que podria ser estatica pero
                H
              </p>
            </div>
            <div className="flex-1 min-w-72 relative aspect-square rounded-lg overflow-hidden"></div>
          </section>
          <section>
            <section className="flex flex-contain">
              <h3 className="h2-page-product">Caracteristicas</h3>
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
