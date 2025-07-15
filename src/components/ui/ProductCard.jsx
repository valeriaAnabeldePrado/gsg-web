import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './ProductCard.css';

export const ProductCard = ({
  product,
  modelo,
  type = 'productos',
  imageUrl,
  title,
  id,
}) => {
  console.log(title);
  // Determinar la URL de la imagen basada en el tipo
  const getImageUrl = () => {
    if (imageUrl) return imageUrl;

    if (type === 'accesorios') {
      return `https://images.smartcloudstudio.com/gsg/fotos_blanco/accesorios/${id}.jpg`;
    } else if (type === 'led') {
      return `https://images.smartcloudstudio.com/gsg/fotos_blanco/led/${id}.jpg`;
    } else {
      return modelo?.foto_portada;
    }
  };

  // Determinar el título
  const getTitle = () => {
    if (title) return title;
    return modelo?.subnombre || product?.nombre;
  };

  // Determinar la URL del enlace
  const getLinkUrl = () => {
    if (type === 'accesorios') {
      return `/accesorios/${id}`;
    } else if (type === 'led') {
      return `/led/${id}`;
    } else {
      return `/productos/${product.categoria}/${product._id}`;
    }
  };

  return (
    <div className="product-card-container">
      <Link href={getLinkUrl()}>
        <div className="product-card">
          {/* Card de imagen */}
          <div className="product-card-image-container">
            <Image
              src={getImageUrl()}
              alt={getTitle() || 'Producto'}
              // className="product-card-image"
              width={300}
              height={300}
              className="product-card-image"
            />
          </div>

          {/* Pie de card con título */}
          <div className="product-card-footer">
            <h2 className="product-card-title">{getTitle()}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
