'use client';
import Image from 'next/image';

const LayoutProductId = ({ children, params }) => {
  let { categoria } = params;
  const cat = categoria.toLowerCase();
  return (
    <div>
      <div className="w-full h-[40vh] bg-slate-900 relative overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src={`https://images.smartcloudstudio.com/gsg/portadas/${cat}.png`}
            alt={`${categoria}`}
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
