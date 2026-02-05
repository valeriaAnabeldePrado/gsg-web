'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

export default function AccessoryDetailClient({ accessory }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Comunicar al layout que el contenido ha cargado
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Obtener todas las imágenes (gallery y tech)
  const allImages =
    accessory.media?.filter((m) => m.kind === 'gallery' || m.kind === 'tech') ||
    [];

  // Si no hay imágenes en media, usar photo_url
  if (allImages.length === 0 && accessory.photoUrl) {
    allImages.push({
      path: accessory.photoUrl,
      kind: 'gallery',
      alt_text: accessory.name,
    });
  }

  const currentImage = allImages[selectedImageIndex];

  // Helper function to get full image URL
  const getImageUrl = (path) => {
    if (!path) return '';
    // Si ya es una URL completa, devolverla tal cual
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Si no, agregarle la base URL
    return `${R2_BASE_URL}/${path}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Información del accesorio - PRIMERO */}
          <div className="space-y-6 order-1 md:order-1">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Accesorio
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {accessory.name}
              </h1>
              {accessory.description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {accessory.description}
                </p>
              )}
            </div>

            {/* Especificaciones Técnicas */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4">
                Especificaciones Técnicas
              </h3>
              {accessory.watt && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Potencia</span>
                  <span className="font-semibold text-gray-900">
                    {accessory.watt} W
                  </span>
                </div>
              )}
              {accessory.voltageLabel && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Voltaje</span>
                  <span className="font-semibold text-gray-900">
                    {accessory.voltageLabel}
                  </span>
                </div>
              )}
              {accessory.voltageMin && accessory.voltageMax && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Rango de Voltaje</span>
                  <span className="font-semibold text-gray-900">
                    {accessory.voltageMin}V - {accessory.voltageMax}V
                  </span>
                </div>
              )}
            </div>

            {/* Acabados disponibles */}
            {accessory.finishes && accessory.finishes.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-4">Acabados Disponibles</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {accessory.finishes.map((finish) => (
                    <div
                      key={finish.id}
                      className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-all"
                    >
                      {finish.hex_color && (
                        <div
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: finish.hex_color }}
                        />
                      )}
                      <span className="text-sm font-medium">{finish.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tonos de luz disponibles */}
            {accessory.lightTones && accessory.lightTones.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-4">Tonos de Luz</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {accessory.lightTones.map((tone) => (
                    <div
                      key={tone.id}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-all text-center"
                    >
                      <p className="font-semibold text-sm">{tone.name}</p>
                      {tone.kelvin && (
                        <p className="text-xs text-gray-500">{tone.kelvin}K</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Galería de imágenes - SEGUNDO */}
          <div className="space-y-4 order-2 md:order-2">
            {currentImage ? (
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(currentImage.path)}
                  alt={currentImage.alt_text || accessory.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Sin imagen</p>
              </div>
            )}

            {allImages.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex
                        ? 'border-blue-500 scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={getImageUrl(img.path)}
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
