'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

export default function AccessoryDetailClient({ accessory }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

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

  // Ficha técnica PDF
  const datasheet = accessory.media?.find((m) => m.kind === 'datasheet');

  // Calcular potencia según amperaje
  const power12V = accessory.amperage ? Math.round(accessory.amperage * 12) : null;
  const power24V = accessory.amperage ? Math.round(accessory.amperage * 24) : null;

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
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Volver
        </button>
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
              {accessory.amperage && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Amperaje Máximo</span>
                  <span className="font-semibold text-gray-900">
                    {accessory.amperage} A
                  </span>
                </div>
              )}
              {(power12V || power24V) && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Potencia Calculada</span>
                  <span className="font-semibold text-gray-900">
                    {power12V && `${power12V}W @ 12V`}
                    {power12V && power24V && ' / '}
                    {power24V && `${power24V}W @ 24V`}
                  </span>
                </div>
              )}
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
              {datasheet && (
                <div className="pt-2">
                  <a
                    href={datasheet.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Descargar Ficha Técnica (PDF)
                  </a>
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
                  className="w-full h-full object-cover"
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
