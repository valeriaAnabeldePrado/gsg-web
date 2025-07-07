import React from 'react';

const BrandLoader = () => {
  return (
    <div className="flex justify-center items-center w-full py-20">
      <div className="relative">
        {/* Círculo principal */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#f53e16] rounded-full animate-spin"></div>

        {/* Círculo secundario */}
        <div
          className="absolute top-1 left-1 w-14 h-14 border-4 border-transparent border-r-[#f53e16] rounded-full animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>

        {/* Texto de carga */}
        <div className="mt-6 text-center">
          <p className="text-[#f53e16] font-medium text-sm animate-pulse">
            Cargando...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandLoader;
