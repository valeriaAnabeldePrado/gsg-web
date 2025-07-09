'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './ledSection.css';
import { IMG_URL } from '@/utils/constants';
import ImageSkeleton from '@/components/loader/ImageSkeleton';
import BrandLoader from '@/components/loader/BrandLoader';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductSkeletonList } from '@/components/ui/ProductSkeleton';

const Productos = () => {
  const [leds, setLeds] = useState([]);
  const [description, setDescription] = useState([]);
  const [loader, setLoader] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/led`);
      const data = await res.json();
      const todosLosModelos = data.led.flatMap((acc) => acc.modelos);
      const desc = data.led[0].descripcion;
      setDescription(desc);
      setLeds(todosLosModelos);
      setLoader(false);
    };

    fetchProducts();
  }, []);

  const handleImageLoad = (imageId) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [imageId]: true,
    }));
  };

  const handleImageError = (imageId) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [imageId]: true,
    }));
  };

  return (
    <>
      <div className="w-full wrapper-cont">
        <section className="flex items-center justify-between flex-wrap w-full responsive-container">
          <div className="p-text-product-description p-8 text-center w-full items-center flex justify-center flex-col-reverse ">
            <h3 className="md:w-10/12 ">{description}</h3>
            <h2 className="h2-hero-title text-center">Leds</h2>
          </div>
          {!loader ? (
            leds.map((el, i) => (
              <ProductCard
                key={`${i}_${el.id}`}
                type="led"
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
