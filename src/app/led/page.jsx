'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './ledSection.css';
import { IMG_URL } from '@/utils/constants';
import ImageSkeleton from '@/components/loader/ImageSkeleton';
import BrandLoader from '@/components/loader/BrandLoader';

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
              <div
                key={`${i}_${el.id}`}
                className="container-items group transform transition-transform duration-300 group-hover:scale-100 rounded-3xl"
              >
                <Link href={`/led/${el.id}`}>
                  <div className="relative container-img-g transform transition-transform duration-300 group-hover:scale-100 rounded-3xl">
                    {/* Skeleton mientras carga la imagen */}
                    {!imageLoadStates[el.id] && (
                      <ImageSkeleton className="w-full h-full absolute inset-0" />
                    )}

                    <img
                      key={el.id}
                      src={`${IMG_URL}/fotos_blanco/led/${el.id}.jpg`}
                      alt={el.subnombre}
                      className={`object-cover w-full h-full absolute inset-0 rounded-3xl transition-opacity duration-300 ${
                        imageLoadStates[el.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(el.id)}
                      onError={() => handleImageError(el.id)}
                    />
                    <div className="mask rounded-3xl"></div>
                    <h2 className="title-gallery">{el.subnombre}</h2>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <BrandLoader />
          )}
        </section>
      </div>
    </>
  );
};

export default Productos;
