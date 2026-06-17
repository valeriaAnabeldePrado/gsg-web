'use client';

import { useState, useEffect } from 'react';
import '../../product-detail.css';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${R2_BASE_URL}/${path}`;
};

export default function LedProfileDetailClient({ profile }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const allImages = profile.media?.filter((m) =>
    ['cover', 'gallery', 'tech', 'accessory'].includes(m.kind),
  ) || [];

  const pdfs = profile.media?.filter((m) =>
    ['datasheet', 'spec', 'pdf'].includes(m.kind),
  ) || [];

  const currentImage = allImages[selectedImageIndex];

  const specRows = [
    profile.material && { label: 'Material', value: profile.material },
    profile.max_w_per_m && { label: 'Potencia máxima recomendada', value: `${profile.max_w_per_m} W/m` },
  ].filter(Boolean);

  return (
    <div className="product-detail-page">

      {/* GALLERY + INFO */}
      <section className="product-body">
        <div className="product-body-container">
          {/* GALLERY */}
          <div className="product-gallery">
            <div className="gallery-main-image">
              {currentImage ? (
                <img
                  src={getImageUrl(currentImage.path)}
                  alt={currentImage.alt_text || profile.name}
                />
              ) : (
                <div style={{ color: '#ccc', fontSize: '0.9rem' }}>Sin imagen disponible</div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="gallery-thumbnails">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`gallery-thumbnail ${idx === selectedImageIndex ? 'active' : ''}`}
                  >
                    <img src={getImageUrl(img.path)} alt={`Vista ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="product-info">
            <span className="product-category">Perfiles LED</span>
            <h1 className="product-title">{profile.name}</h1>
            <span className="product-code">{profile.code}</span>
            <p className="product-description">{profile.description}</p>

            {specRows.length > 0 && (
              <div className="variants-section">
                <span className="section-label">Especificaciones</span>
                {specRows.map((row, i) => (
                  <div key={i} className="spec-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 45, borderBottom: '1px solid #e0e0e0' }}>
                    <span className="spec-label">{row.label}</span>
                    <span className="spec-value">{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ACABADOS */}
      {profile.finishes && profile.finishes.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Acabados disponibles</h2>
          </div>
          <div className="finishes-grid">
            {profile.finishes.map((finish, idx) => (
              <div key={idx} className="finish-item">
                {finish.hex_color && (
                  <div className="finish-color" style={{ backgroundColor: finish.hex_color }} />
                )}
                <div className="finish-info">
                  <h4>{finish.name}</h4>
                  {finish.material_base && <p className="finish-material">{finish.material_base}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DIFUSORES */}
      {profile.diffusers && profile.diffusers.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Difusores compatibles</h2>
          </div>
          <div className="addons-grid">
            {profile.diffusers.map((item, idx) => (
              <div key={idx} className="addon-card">
                <div className="addon-info">
                  <h3 className="addon-name">{item.diffuser?.name}</h3>
                  {item.notes && <p className="addon-description">{item.notes}</p>}
                  <div className="addon-specs">
                    <span className="addon-spec-tag">{item.included_by_m ? 'Incluido' : 'Opcional'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KIT INCLUIDO */}
      {profile.included_accessories && profile.included_accessories.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Kit incluido</h2>
          </div>
          <div className="addons-grid">
            {profile.included_accessories.map((item, idx) => (
              <div key={idx} className="addon-card">
                <div className="addon-info">
                  <h3 className="addon-name">{item.accessory?.name}</h3>
                  <p className="addon-description">Cantidad: {item.qty_per_m} u/m</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ADICIONALES */}
      {profile.optional_accessories && profile.optional_accessories.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Adicionales</h2>
          </div>
          <div className="addons-grid">
            {profile.optional_accessories.map((item, idx) => (
              <div key={idx} className="addon-card">
                <div className="addon-info">
                  <h3 className="addon-name">{item.name}</h3>
                  {item.description && <p className="addon-description">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COMPONENTES */}
      {profile.parts && profile.parts.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Componentes</h2>
          </div>
          <div className="addons-grid">
            {profile.parts.map((part, idx) => (
              <div key={idx} className="addon-card">
                {part.photo_path && (
                  <div className="addon-icon" style={{ width: 80, height: 80, borderRadius: 0, overflow: 'hidden', padding: 0 }}>
                    <img src={getImageUrl(part.photo_path)} alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className="addon-info">
                  <h3 className="addon-name">{part.name}</h3>
                  <div className="addon-specs">
                    <span className="addon-spec-tag">{part.included ? 'Sistema' : 'Extra'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* APLICACIONES */}
      {profile.use_cases && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Aplicaciones</h2>
          </div>
          <p className="product-description" style={{ maxWidth: 800 }}>{profile.use_cases}</p>
        </section>
      )}

      {/* DESCARGAS */}
      {pdfs.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Documentación técnica</h2>
          </div>
          <div className="downloads-grid">
            {pdfs.map((pdf, idx) => (
              <a
                key={idx}
                href={getImageUrl(pdf.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="download-card"
              >
                <div className="download-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="download-info">
                  <h4>{pdf.kind === 'datasheet' ? 'Ficha técnica' : 'Documento'}</h4>
                  <p className="download-meta">PDF</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
