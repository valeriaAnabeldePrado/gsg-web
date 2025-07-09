import React from 'react';
import './ProductSkeleton.css';

export const ProductSkeleton = () => (
  <div className="product-skeleton-container">
    <div className="product-skeleton-card">
      {/* Skeleton de imagen */}
      <div className="product-skeleton-image">
        <div className="product-skeleton-image-placeholder"></div>
      </div>

      {/* Skeleton del título */}
      <div className="product-skeleton-footer">
        <div className="product-skeleton-title"></div>
      </div>
    </div>
  </div>
);

export const ProductSkeletonList = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </>
);
