import Image from 'next/image';

const BannerLayout = ({ children, logoSrc, alt, className = '' }) => {
  return (
    <div className={`mt-8 md:mt-10 ${className}`}>
      <div
        className="w-full h-[40vh] relative overflow-hidden flex items-center justify-end"
        style={{
          background:
            'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 60%, #fff 100%)',
        }}
      >
        <div className="h-[40%] md:h-[40%] aspect-square relative mr-10 flex items-center">
          <Image
            src={logoSrc}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default BannerLayout;
