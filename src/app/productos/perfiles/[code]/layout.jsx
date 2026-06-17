'use client';
import { useState, useEffect } from 'react';
import BrandLoader from '@/components/loader/BrandLoader';

const LayoutPerfilId = ({ children }) => {
  const [childrenLoaded, setChildrenLoaded] = useState(false);

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
    <div className="mt-8 md:mt-10 lg:mt-24 xl:mt-32">
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
