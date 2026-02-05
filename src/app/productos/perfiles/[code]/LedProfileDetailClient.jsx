'use client';

import { useState, useEffect } from 'react';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

export default function LedProfileDetailClient({ profile }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Comunicar al layout que el contenido ha cargado
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Tomar TODAS las imágenes que sean para mostrar (no PDFs)
  const allImages =
    profile.media?.filter(
      (m) =>
        m.kind === 'cover' ||
        m.kind === 'gallery' ||
        m.kind === 'tech' ||
        m.kind === 'accessory',
    ) || [];

  const pdfs =
    profile.media?.filter((m) => m.kind === 'datasheet' || m.kind === 'spec') ||
    [];

  // Debug: Ver qué media estamos recibiendo
  useEffect(() => {
    console.log('=== DEBUG PROFILE MEDIA ===');
    console.log('Full profile:', profile);
    console.log('Profile.media:', profile.media);
    console.log('Media length:', profile.media?.length || 0);
    
    if (profile.media && profile.media.length > 0) {
      console.log('Media items details:');
      profile.media.forEach((item, index) => {
        console.log(`  [${index}] kind: "${item.kind}", path: "${item.path}"`);
      });
    }
    
    console.log('All images filtered:', allImages);
    console.log('All images length:', allImages.length);
    console.log('PDFs filtered:', pdfs);
    console.log('========================');
  }, [profile, allImages, pdfs]);

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
          {/* Información del perfil - PRIMERO */}
          <div className="space-y-6 order-1 md:order-1">
            <div>
              <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Perfil LED
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {profile.name}
              </h1>
              {profile.description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {profile.description}
                </p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4">Especificaciones</h3>
              {profile.code && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Código</span>
                  <span className="font-semibold text-gray-900">
                    {profile.code}
                  </span>
                </div>
              )}
              {profile.material && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Material</span>
                  <span className="font-semibold text-gray-900">
                    {profile.material}
                  </span>
                </div>
              )}
              {profile.finish_surface && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Superficie</span>
                  <span className="font-semibold text-gray-900">
                    {profile.finish_surface}
                  </span>
                </div>
              )}
              {profile.max_w_per_m && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Máximo W/m</span>
                  <span className="font-semibold text-gray-900">
                    {profile.max_w_per_m} W/m
                  </span>
                </div>
              )}
              {profile.use_cases && (
                <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Usos</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {profile.use_cases}
                  </span>
                </div>
              )}
            </div>

            {pdfs.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Descargas</h3>
                {pdfs.map((pdf, idx) => (
                  <a
                    key={idx}
                    href={getImageUrl(pdf.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all group"
                  >
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold group-hover:text-red-600 transition-colors">
                        {pdf.kind === 'datasheet'
                          ? 'Ficha Técnica'
                          : 'Especificaciones'}
                      </p>
                      {pdf.title && (
                        <p className="text-sm text-gray-600">{pdf.title}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Galería de imágenes - SEGUNDO */}
          <div className="space-y-4 order-2 md:order-2">
            {allImages.length === 0 && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ No se encontraron imágenes para este perfil.
                  <br />
                  Media items: {profile.media?.length || 0}
                  <br />
                  Kinds disponibles:{' '}
                  {profile.media?.map((m) => m.kind).join(', ') || 'ninguno'}
                </p>
              </div>
            )}

            {currentImage ? (
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(currentImage.path)}
                  alt={currentImage.alt_text || profile.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error('Error loading image:', currentImage.path);
                    e.target.src = '/gsg/no-image.svg';
                  }}
                />
              </div>
            ) : allImages.length === 0 ? (
              <div className="aspect-square bg-gray-200 rounded-lg flex flex-col items-center justify-center p-8 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">Sin imágenes disponibles</p>
                <p className="text-sm text-gray-400 mt-2">
                  Este perfil aún no tiene imágenes cargadas
                </p>
              </div>
            ) : null}

            {allImages.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex
                        ? 'border-red-500 scale-105'
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

        {/* Secciones adicionales */}
        <div className="max-w-7xl mx-auto space-y-12">
          {profile.finishes && profile.finishes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Acabados Disponibles</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {profile.finishes.map((finish, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-all"
                  >
                    <p className="font-semibold text-center text-sm">
                      {finish.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.diffusers && profile.diffusers.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Difusores</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.diffusers.map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-gray-200 rounded-lg p-4 bg-white"
                  >
                    <h3 className="font-bold text-lg mb-2">
                      {item.diffuser?.name}
                    </h3>
                    <div className="text-sm space-y-1">
                      {item.included_by_m ? (
                        <p className="text-green-600 font-semibold">
                          ✓ Incluido: {item.included_qty_per_m || 1}/metro
                        </p>
                      ) : (
                        <p className="text-orange-600 font-semibold">
                          ⊕ Opcional
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-gray-600 italic mt-2">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.included_accessories &&
            profile.included_accessories.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Accesorios Incluidos
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.included_accessories.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-green-400 bg-green-50 rounded-lg p-4"
                    >
                      <h3 className="font-bold mb-1">{item.accessory?.name}</h3>
                      {item.accessory?.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.accessory.description}
                        </p>
                      )}
                      <p className="text-green-700 font-semibold">
                        {item.qty_per_m}/metro
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {profile.optional_accessories &&
            profile.optional_accessories.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Accesorios Opcionales
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.optional_accessories.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-orange-400 bg-orange-50 rounded-lg p-4"
                    >
                      <h3 className="font-bold mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {profile.parts && profile.parts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Componentes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.parts.map((part, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-4 ${part.included ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                  >
                    {part.photo_path && (
                      <img
                        src={getImageUrl(part.photo_path)}
                        alt={part.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-bold mb-1">{part.name}</h3>
                    {part.notes && (
                      <p className="text-sm text-gray-600 mb-2">{part.notes}</p>
                    )}
                    <p
                      className={`text-sm font-semibold ${part.included ? 'text-green-700' : 'text-gray-600'}`}
                    >
                      {part.included ? '✓ Incluido' : 'Opcional'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
