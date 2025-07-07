import React from 'react';

const ImageSkeleton = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-3xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default ImageSkeleton;
