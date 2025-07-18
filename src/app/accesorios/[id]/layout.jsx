'use client';
import BannerLayout from '@/components/ui/BannerLayout';

const LayoutProductId = ({ children }) => {
  return (
    <BannerLayout logoSrc="/imagenes/redLogo.png" alt="accesorios">
      {children}
    </BannerLayout>
  );
};

export default LayoutProductId;
