'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './accSection.css';
import { IMG_URL } from '@/utils/constants';
import ImageSkeleton from '@/components/loader/ImageSkeleton';
import BrandLoader from '@/components/loader/BrandLoader';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductSkeletonList } from '@/components/ui/ProductSkeleton';

const Productos = () => {
  const [accessories, setAccessories] = useState([]);
  const [description, setDescription] = useState([]);
  const [loader, setLoader] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/accessories`);

      const data = await res.json();
      const todosLosModelos = data.accesorios.flatMap((acc) => acc.modelos);
      const desc = data.accesorios[0].descripcion;
      setDescription(desc);
      setAccessories(todosLosModelos);

      setLoader(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          <div className="p-text-product-description p-8 text-center w-full items-center flex justify-center flex-col-reverse ">
            <h3 className="md:w-10/12 ">{description}</h3>
            <h2 className="h2-hero-title text-center">Accesorios</h2>
          </div>
          {!loader ? (
            accessories.map((el, i) => (
              <ProductCard
                key={`${i}_${el.id}`}
                type="accesorios"
                id={el.id}
                title={el.subnombre}
              />
            ))
          ) : (
            <ProductSkeletonList count={6} />
          )}
        </section>
      </div>
    </>
  );
};

export default Productos;
