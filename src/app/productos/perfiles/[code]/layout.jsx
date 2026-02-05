'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import BrandLoader from '@/components/loader/BrandLoader';

const LayoutPerfilId = ({ children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [childrenLoaded, setChildrenLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // También marcamos como cargado para evitar que se quede en skeleton
  };

  // Timeout de respaldo para asegurar que el skeleton no se quede para siempre
  useEffect(() => {
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 7000); // 7 segundos de timeout

    return () => clearTimeout(timeout);
  }, []);

  // Escuchar cuando el contenido de la página ha cargado
  useEffect(() => {
    const handleProductPageLoaded = () => {
      setChildrenLoaded(true);
    };

    window.addEventListener('productPageLoaded', handleProductPageLoaded);

    return () => {
      window.removeEventListener('productPageLoaded', handleProductPageLoaded);
    };
  }, []);

  return (
    <div className="mt-8 md:mt-10">
      {/* Hero/Portada de Perfiles LED */}
      <div className="w-full h-[40vh] bg-slate-900 relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
            <div className="text-center"></div>
          </div>
        )}

        <div
          className={`w-full h-full relative ${imageLoaded ? 'block' : 'hidden'}`}
        >
          <Image
            src={`/gsg/portadas/perfiles.png`}
            alt="Perfiles LED"
            fill
            className="object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority
          />
        </div>
      </div>

      {/* Children con loader */}
      <div className="relative">
        {!childrenLoaded && (
          <div className="absolute inset-0 z-10 bg-white h-[100vh]">
            <BrandLoader />
          </div>
        )}
        <div className={childrenLoaded ? 'block' : 'opacity-0'}>{children}</div>
      </div>
    </div>
  );
};

export default LayoutPerfilId;
