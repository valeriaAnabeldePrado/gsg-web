import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const ProductCard = ({ product, modelo }) => (
  <div className="container-itemss group transform transition-transform duration-300 hover:scale-105 rounded-3xl">
    <Link href={`/productos/${product.categoria}/${product._id}`}>
      <div className="relative container-img-gg rounded-3xl overflow-hidden">
        <img
          src={modelo.foto_portada}
          alt={modelo.subnombre || 'Producto'}
          className="img-class rounded-3xl object-cover w-full h-full"
          loading="lazy"
        />

        <h2 className="title-gallery">{modelo.subnombre}</h2>
      </div>
    </Link>
  </div>
);
