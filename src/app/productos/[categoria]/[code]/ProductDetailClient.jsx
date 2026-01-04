'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import './product-detail.css';
import ProfileComparisonTable from '@/components/products/ProfileComparisonTable';

export default function ProductDetailClient({ product }) {
  const pathname = usePathname();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Comunicar al layout que el contenido ha cargado
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index);
    setSelectedImageIndex(0); // Reset a la primera imagen cuando cambia la variante
  };

  const selectedVariant = product.variants?.[selectedVariantIndex];

  // Obtener imágenes de la variante seleccionada o del producto general
  const getVariantImages = () => {
    // Filtrar solo archivos de tipo imagen (cover, gallery, tech)
    const imageTypes = ['cover', 'gallery', 'tech'];

    // Si la variante tiene imágenes propias, usarlas (excluyendo PDFs)
    if (selectedVariant?.media && selectedVariant.media.length > 0) {
      const variantImages = selectedVariant.media.filter((m) =>
        imageTypes.includes(m.kind),
      );
      if (variantImages.length > 0) {
        return variantImages;
      }
    }

    // Si no, usar las imágenes generales del producto (excluyendo PDFs)
    if (product.media && product.media.length > 0) {
      const productImages = product.media.filter((m) =>
        imageTypes.includes(m.kind),
      );
      if (productImages.length > 0) {
        return productImages;
      }
    }

    // Imagen por defecto
    return [
      {
        path: '/gsg/no-image.svg',
        kind: 'cover',
        alt_text: product.name,
      },
    ];
  };

  const variantImages = getVariantImages();
  const currentImage = variantImages[selectedImageIndex] || variantImages[0];

  console.log(variantImages);

  // Reset del índice de imagen si la variante tiene menos imágenes que el índice actual
  useEffect(() => {
    if (selectedImageIndex >= variantImages.length) {
      setSelectedImageIndex(0);
    }
  }, [selectedVariantIndex, variantImages.length, selectedImageIndex]);

  // Obtener imagen técnica de la variante actual
  const getTechImage = () => {
    const techImage = variantImages.find((m) => m.kind === 'tech');
    return techImage?.path;
  };

  // Obtener archivos descargables (datasheet, spec) de la variante actual
  const getDownloadableFiles = () => {
    if (!selectedVariant?.media) return [];

    return selectedVariant.media.filter(
      (m) => m.kind === 'datasheet' || m.kind === 'spec',
    );
  };

  const downloadableFiles = getDownloadableFiles();

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      const kb = bytes / 1024;
      return `${kb.toFixed(0)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="product-detail-page">
      {/* HERO SECTION */}
      <section className="product-hero">
        <div className="product-hero-container">
          {/* GALLERY */}
          <div className="product-gallery">
            <div className="gallery-main-image">
              <img
                src={currentImage.path}
                alt={currentImage.alt_text || product.name}
              />
            </div>

            {variantImages.length > 1 && (
              <div className="gallery-thumbnails">
                {variantImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`gallery-thumbnail ${
                      selectedImageIndex === index ? 'active' : ''
                    }`}
                  >
                    <img
                      src={img.path}
                      alt={img.alt_text || `Vista ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="product-info">
            <span className="product-category">
              {product.category?.name || 'Producto'}
            </span>
            <h1 className="product-title">{product.name}</h1>
            <span className="product-code">{product.code}</span>
            <p className="product-description">{product.description}</p>

            {/* VARIANTS */}
            {product.variants && product.variants.length > 1 && (
              <div className="variants-section">
                <span className="section-label">Variantes disponibles</span>
                <div className="variants-grid">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(index)}
                      className={`variant-option ${
                        selectedVariantIndex === index ? 'active' : ''
                      }`}
                    >
                      <div className="variant-info">
                        <h4>{variant.name}</h4>
                        <span className="variant-code">
                          {variant.variantCode}
                        </span>
                        <div className="variant-features">
                          {variant.includesLed && (
                            <span className="variant-badge">LED incluido</span>
                          )}
                          {variant.includesDriver && (
                            <span className="variant-badge">
                              Driver incluido
                            </span>
                          )}
                        </div>
                      </div>
                      {selectedVariantIndex === index && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FINISHES */}
      {product.finishes && product.finishes.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Acabados disponibles</h2>
            <p className="section-subtitle">
              Materiales y colores para personalizar tu luminaria
            </p>
          </div>
          <div className="finishes-grid">
            {product.finishes.map((finish) => (
              <div key={finish.id} className="finish-item">
                {finish.hex_color && (
                  <div
                    className="finish-color"
                    style={{ backgroundColor: finish.hex_color }}
                  />
                )}
                <div className="finish-info">
                  <h4>{finish.name}</h4>
                  {finish.material_base && (
                    <p className="finish-material">{finish.material_base}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VARIANT DETAILS */}
      {selectedVariant && (
        <>
          {/* LIGHT TONES */}
          {selectedVariant.lightTones &&
            selectedVariant.lightTones.length > 0 && (
              <section className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Tonos de luz</h2>
                  <p className="section-subtitle">
                    Temperaturas de color disponibles para{' '}
                    {selectedVariant.name}
                  </p>
                </div>
                <div className="light-tones-grid">
                  {selectedVariant.lightTones.map((tone) => (
                    <div key={tone.id} className="light-tone-item">
                      <p className="light-tone-name">{tone.name}</p>
                      {tone.kelvin && (
                        <p className="light-tone-kelvin">{tone.kelvin}K</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* SPECIFICATIONS */}
          {selectedVariant.configurations &&
            selectedVariant.configurations.length > 0 && (
              <section className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Especificaciones técnicas</h2>
                  <p className="section-subtitle">
                    Configuraciones disponibles para {selectedVariant.name}
                  </p>
                </div>
                <div className="specs-grid">
                  {selectedVariant.configurations.map((config) => (
                    <div key={config.id} className="spec-card">
                      {config.name && (
                        <div className="spec-sku">{config.name}</div>
                      )}
                      {!config.name && config.sku && (
                        <div className="spec-sku">{config.sku}</div>
                      )}
                      <div className="spec-details">
                        {config.watt && (
                          <div className="spec-row">
                            <span className="spec-label">Potencia</span>
                            <span className="spec-value">{config.watt}W</span>
                          </div>
                        )}
                        {config.lumens && (
                          <div className="spec-row">
                            <span className="spec-label">Flujo luminoso</span>
                            <span className="spec-value">
                              {config.lumens} lm
                            </span>
                          </div>
                        )}
                        {config.voltage && (
                          <div className="spec-row">
                            <span className="spec-label">Voltaje</span>
                            <span className="spec-value">{config.voltage}</span>
                          </div>
                        )}
                        {config.length_cm && config.width_cm && (
                          <div className="spec-row">
                            <span className="spec-label">Dimensiones</span>
                            <span className="spec-value">
                              {(() => {
                                const lengths = config.length_cm
                                  .toString()
                                  .split(',')
                                  .map((v) => v.trim());
                                const widths = config.width_cm
                                  .toString()
                                  .split(',')
                                  .map((v) => v.trim());

                                if (
                                  lengths.length > 1 &&
                                  lengths.length === widths.length
                                ) {
                                  return (
                                    lengths
                                      .map((l, i) => `${l}x${widths[i]}`)
                                      .join(', ') + ' cm'
                                  );
                                }
                                return `${config.length_cm}x${config.width_cm} cm`;
                              })()}
                            </span>
                          </div>
                        )}
                        {config.length_cm && !config.width_cm && (
                          <div className="spec-row">
                            <span className="spec-label">Largo</span>
                            <span className="spec-value">
                              {config.length_cm} cm
                            </span>
                          </div>
                        )}
                        {config.width_cm && !config.length_cm && (
                          <div className="spec-row">
                            <span className="spec-label">Ancho</span>
                            <span className="spec-value">
                              {config.width_cm} cm
                            </span>
                          </div>
                        )}
                        {config.diameter_description && (
                          <div className="spec-row">
                            <span className="spec-label">Diámetro</span>
                            <span className="spec-value">
                              {config.diameter_description}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* ADDONS */}
          {product.addons && product.addons.length > 0 && (
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">Accesorios compatibles</h2>
                <p className="section-subtitle">
                  Complementos recomendados para este producto
                </p>
              </div>
              <div className="addons-grid">
                {product.addons.map((addon) => {
                  const categoryKey = addon.category?.toLowerCase() || 'other';
                  const categoryConfig =
                    {
                      control: { label: 'Control', icon: '🎛️' },
                      instalacion: { label: 'Instalación', icon: '🔧' },
                      driver: { label: 'Driver', icon: '⚡' },
                      accesorio: { label: 'Accesorio', icon: '🔌' },
                    }[categoryKey] || { label: 'Accesorio', icon: '🔌' };

                  return (
                    <div key={addon.id} className="addon-card">
                      <div className="addon-icon">{categoryConfig.icon}</div>
                      <div className="addon-info">
                        <span className="addon-category">
                          {categoryConfig.label}
                        </span>
                        <h4 className="addon-name">{addon.name}</h4>
                        <p className="addon-code">{addon.code}</p>
                        {addon.description && (
                          <p className="addon-description">
                            {addon.description}
                          </p>
                        )}
                        {addon.specs && (
                          <div className="addon-specs">
                            {Object.entries(addon.specs).map(([key, value]) => (
                              <span key={key} className="addon-spec-tag">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* DOWNLOADS */}
          {downloadableFiles.length > 0 && (
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">Documentación técnica</h2>
                <p className="section-subtitle">
                  Fichas técnicas y especificaciones para descarga
                </p>
              </div>
              <div className="downloads-grid">
                {downloadableFiles.map((file) => (
                  <a
                    key={file.id}
                    href={file.path}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-card"
                  >
                    <div className="download-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="download-info">
                      <h4>
                        {file.title ||
                          (file.kind === 'datasheet'
                            ? 'Ficha Técnica'
                            : 'Especificaciones')}
                      </h4>
                      <p className="download-meta">
                        {file.mime_type?.split('/')[1]?.toUpperCase() || 'PDF'}
                        {file.file_size_bytes &&
                          ` • ${formatFileSize(file.file_size_bytes)}`}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* PROFILE COMPARISON TABLE */}
          {product.category?.name?.toLowerCase().includes('perfil') && (
            <section className="content-section">
              <ProfileComparisonTable />
            </section>
          )}
        </>
      )}

      {/* TECHNICAL IMAGE
      {getTechImage() && (
        <section className="technical-image-section">
          <div className="technical-image-container">
            <img
              src={getTechImage()}
              alt={`Especificación técnica de ${product.name}`}
            />
          </div>
        </section>
      )} */}
    </div>
  );
}
