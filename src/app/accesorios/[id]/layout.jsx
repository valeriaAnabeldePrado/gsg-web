'use client';
import Image from 'next/image';

const LayoutProductId = ({ children, params }) => {
  return (
    <div>
      <div className="w-full h-[40vh] bg-slate-900 relative overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src={`/portadas/accesorios.png`}
            alt="accesorios"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default LayoutProductId;
