'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  getFamilyCoverImage,
  getFamilyGalleryImages,
  getFamilyTechImages,
  formatVariantDisplay,
  groupVariantsBy,
} from '@/lib/supabase/led-roll-sdk';
import './led-detail.css';

export default function LedDetailClient({ family }) {
  const [selectedVariant, setSelectedVariant] = useState(
    family.variants?.[0] || null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const coverImage = getFamilyCoverImage(family);
  const galleryImages = getFamilyGalleryImages(family);
  const techImages = getFamilyTechImages(family);

  // Todas las imágenes disponibles
  const allImages = [coverImage, ...galleryImages, ...techImages].filter(
    Boolean,
  );

  const currentImage = allImages[selectedImageIndex];

  // Agrupar variantes por voltaje y IP
  const variantsByVoltage = family.variants
    ? groupVariantsBy(family.variants, 'voltage')
    : {};

  return (
    <div className="led-detail-page">
      {/* Hero Banner with Background */}
      <section className="led-detail-banner">
        {coverImage && (
          <div className="led-detail-banner-background">
            <Image
              src={coverImage.path}
              alt={coverImage.alt_text || family.name}
              fill
              className="led-detail-banner-image"
              priority
            />
            <div className="led-detail-banner-overlay" />
          </div>
        )}
        <div className="led-detail-banner-content">
          <span className="led-detail-banner-category">Tira LED</span>
          <h1 className="led-detail-banner-title">{family.name}</h1>
          <span className="led-detail-banner-led-type">{family.ledType}</span>
          {family.description && (
            <p className="led-detail-banner-description">
              {family.description}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="led-detail-content">
        <div className="led-detail-container">
          {/* Gallery */}
          <div className="led-detail-gallery">
            <div className="led-detail-gallery-main">
              {currentImage ? (
                <Image
                  src={currentImage.path}
                  alt={currentImage.alt_text || family.name}
                  fill
                  className="led-detail-gallery-main-image"
                  priority
                />
              ) : (
                <Image
                  src="/gsg/no-image.svg"
                  alt="Sin imagen disponible"
                  fill
                  className="led-detail-gallery-main-image"
                  priority
                />
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="led-detail-gallery-thumbnails">
                {allImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`led-detail-gallery-thumb ${selectedImageIndex === index ? 'active' : ''}`}
                  >
                    <Image
                      src={img.path}
                      alt={img.alt_text || `${family.name} ${index + 1}`}
                      fill
                      className="led-detail-thumb-image"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="led-detail-info">
            {/* Family Specs */}
            <div className="led-detail-specs-section">
              <h3 className="led-detail-specs-title">
                Características de la familia
              </h3>
              <div className="led-detail-specs-grid">
                {family.ledsPerMeter && (
                  <div className="led-detail-spec-item">
                    <span className="led-detail-spec-label">
                      LEDs por metro:
                    </span>
                    <span className="led-detail-spec-value">
                      {family.ledsPerMeter}
                    </span>
                  </div>
                )}
                {family.pcbWidthMm && (
                  <div className="led-detail-spec-item">
                    <span className="led-detail-spec-label">Ancho PCB:</span>
                    <span className="led-detail-spec-value">
                      {family.pcbWidthMm}mm
                    </span>
                  </div>
                )}
                {family.rollLengthM && (
                  <div className="led-detail-spec-item">
                    <span className="led-detail-spec-label">Largo bobina:</span>
                    <span className="led-detail-spec-value">
                      {family.rollLengthM}m
                    </span>
                  </div>
                )}
                {family.cri && (
                  <div className="led-detail-spec-item">
                    <span className="led-detail-spec-label">CRI:</span>
                    <span className="led-detail-spec-value">{family.cri}</span>
                  </div>
                )}
                {family.warrantyYears && (
                  <div className="led-detail-spec-item">
                    <span className="led-detail-spec-label">Garantía:</span>
                    <span className="led-detail-spec-value">
                      {family.warrantyYears} años
                    </span>
                  </div>
                )}
                {family.dimmable && (
                  <div className="led-detail-spec-badge">Dimeable</div>
                )}
                {family.adhesive && (
                  <div className="led-detail-spec-badge">Con adhesivo</div>
                )}
              </div>
            </div>

            {/* Notes */}
            {(family.technicalNote || family.cutNote || family.generalNote) && (
              <div className="led-detail-notes">
                {family.technicalNote && (
                  <div className="led-detail-note-item">
                    <strong>Nota técnica:</strong> {family.technicalNote}
                  </div>
                )}
                {family.cutNote && (
                  <div className="led-detail-note-item">
                    <strong>Nota de corte:</strong> {family.cutNote}
                  </div>
                )}
                {family.generalNote && (
                  <div className="led-detail-note-item">
                    <strong>Nota general:</strong> {family.generalNote}
                  </div>
                )}
              </div>
            )}

            {/* Variants Section */}
            {family.variants && family.variants.length > 0 && (
              <div className="led-detail-variants-section">
                <h3 className="led-detail-variants-title">
                  Variantes disponibles ({family.variants.length})
                </h3>

                {/* Group by voltage */}
                {Object.entries(variantsByVoltage).map(
                  ([voltage, variants]) => (
                    <div key={voltage} className="led-detail-voltage-group">
                      <h4 className="led-detail-voltage-title">{voltage}V</h4>
                      <div className="led-detail-variants-list">
                        {variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`led-detail-variant-card ${selectedVariant?.id === variant.id ? 'active' : ''}`}
                          >
                            <div className="led-detail-variant-header">
                              <span className="led-detail-variant-code">
                                {variant.code}
                              </span>
                              {variant.price && (
                                <span className="led-detail-variant-price">
                                  ${variant.price.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="led-detail-variant-specs">
                              <span>{variant.wattsPerMeter}W/m</span>
                              <span>{variant.lumensPerMeter}lm/m</span>
                              <span>{variant.toneLabel}</span>
                              <span>IP{variant.ipRating}</span>
                            </div>
                            {!variant.stock && (
                              <span className="led-detail-variant-out-of-stock">
                                Sin stock
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* Selected Variant Details */}
            {selectedVariant && (
              <div className="led-detail-selected-variant-details">
                <h3 className="led-detail-selected-variant-title">
                  Detalles de la variante seleccionada
                </h3>
                <div className="led-detail-selected-variant-info">
                  <div className="led-detail-selected-variant-header">
                    <span className="led-detail-selected-code">
                      {selectedVariant.code}
                    </span>
                    {selectedVariant.price && (
                      <span className="led-detail-selected-price">
                        ${selectedVariant.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="led-detail-selected-variant-specs">
                    <div className="led-detail-selected-spec">
                      <span className="led-detail-spec-label">Potencia:</span>
                      <span className="led-detail-spec-value">
                        {selectedVariant.wattsPerMeter}W/m
                      </span>
                    </div>
                    <div className="led-detail-selected-spec">
                      <span className="led-detail-spec-label">
                        Flujo luminoso:
                      </span>
                      <span className="led-detail-spec-value">
                        {selectedVariant.lumensPerMeter}lm/m
                      </span>
                    </div>
                    <div className="led-detail-selected-spec">
                      <span className="led-detail-spec-label">
                        Temperatura:
                      </span>
                      <span className="led-detail-spec-value">
                        {selectedVariant.toneLabel}
                      </span>
                    </div>
                    {selectedVariant.kelvin && (
                      <div className="led-detail-selected-spec">
                        <span className="led-detail-spec-label">Kelvin:</span>
                        <span className="led-detail-spec-value">
                          {selectedVariant.kelvin}K
                        </span>
                      </div>
                    )}
                    <div className="led-detail-selected-spec">
                      <span className="led-detail-spec-label">Voltaje:</span>
                      <span className="led-detail-spec-value">
                        {selectedVariant.voltage}V
                      </span>
                    </div>
                    <div className="led-detail-selected-spec">
                      <span className="led-detail-spec-label">Protección:</span>
                      <span className="led-detail-spec-value">
                        IP{selectedVariant.ipRating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
