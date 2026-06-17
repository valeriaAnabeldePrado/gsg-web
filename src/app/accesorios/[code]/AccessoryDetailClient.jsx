'use client';

import { useState, useEffect } from 'react';
import '../../productos/product-detail.css';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${R2_BASE_URL}/${path}`;
}

export default function AccessoryDetailClient({ accessory }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const allImages = accessory.media?.filter((m) => m.kind === 'gallery' || m.kind === 'tech') || [];
  if (allImages.length === 0 && accessory.photoUrl) {
    allImages.push({ path: accessory.photoUrl, kind: 'gallery', alt_text: accessory.name });
  }
  const currentImage = allImages[selectedImageIndex];

  const pdfs = accessory.media?.filter((m) => m.kind === 'datasheet' || m.kind === 'spec') || [];

  const sp = accessory.specs || {};
  const hasVoltageSpecs =
    sp.power?.['12v_w'] != null || sp.power?.['24v_w'] != null ||
    sp.amperage?.['12v_a'] != null || sp.amperage?.['24v_a'] != null;

  const specRows = [
    accessory.watt && { label: 'Potencia', value: `${accessory.watt} W` },
    accessory.amperage && { label: 'Amperaje', value: `${accessory.amperage} A` },
    accessory.voltageLabel && { label: 'Voltaje', value: accessory.voltageLabel },
    sp.signal_type && { label: 'Señal / Tipo', value: sp.signal_type },
    sp.reach_or_total && { label: 'Alcance / Total', value: sp.reach_or_total },
    sp.led_type && { label: 'LED / Tipo', value: sp.led_type },
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
                  alt={currentImage.alt_text || accessory.name}
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
            {accessory.tipo && <span className="product-category">{accessory.tipo}</span>}
            <h1 className="product-title">{accessory.name}</h1>
            <span className="product-code">{accessory.code}</span>
            {accessory.description && <p className="product-description">{accessory.description}</p>}
            {accessory.notes && <p className="product-description" style={{ fontSize: '0.95rem', color: '#888' }}>{accessory.notes}</p>}

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

      {/* TABLA DE VOLTAJE */}
      {hasVoltageSpecs && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Rendimiento por voltaje</h2>
            <p className="section-subtitle">Comparativa según el voltaje de operación</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1a1a1a' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#666', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Parámetro</th>
                  {(sp.power?.['12v_w'] != null || sp.amperage?.['12v_a'] != null) && <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600 }}>12V</th>}
                  {(sp.power?.['24v_w'] != null || sp.amperage?.['24v_a'] != null) && <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600 }}>24V</th>}
                </tr>
              </thead>
              <tbody>
                {(sp.power?.['12v_w'] != null || sp.power?.['24v_w'] != null) && (
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td style={{ padding: '0.9rem 1rem', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Potencia</td>
                    {(sp.power?.['12v_w'] != null || sp.amperage?.['12v_a'] != null) && <td style={{ padding: '0.9rem 1rem', textAlign: 'right', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>{sp.power?.['12v_w'] != null ? `${sp.power['12v_w']} W` : '—'}</td>}
                    {(sp.power?.['24v_w'] != null || sp.amperage?.['24v_a'] != null) && <td style={{ padding: '0.9rem 1rem', textAlign: 'right', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>{sp.power?.['24v_w'] != null ? `${sp.power['24v_w']} W` : '—'}</td>}
                  </tr>
                )}
                {(sp.amperage?.['12v_a'] != null || sp.amperage?.['24v_a'] != null) && (
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td style={{ padding: '0.9rem 1rem', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amperaje</td>
                    {(sp.power?.['12v_w'] != null || sp.amperage?.['12v_a'] != null) && <td style={{ padding: '0.9rem 1rem', textAlign: 'right', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>{sp.amperage?.['12v_a'] != null ? `${sp.amperage['12v_a']} A` : '—'}</td>}
                    {(sp.power?.['24v_w'] != null || sp.amperage?.['24v_a'] != null) && <td style={{ padding: '0.9rem 1rem', textAlign: 'right', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>{sp.amperage?.['24v_a'] != null ? `${sp.amperage['24v_a']} A` : '—'}</td>}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ACABADOS */}
      {accessory.finishes?.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Acabados disponibles</h2>
          </div>
          <div className="finishes-grid">
            {accessory.finishes.map((finish) => (
              <div key={finish.id} className="finish-item">
                {finish.hex_color && <div className="finish-color" style={{ backgroundColor: finish.hex_color }} />}
                <div className="finish-info">
                  <h4>{finish.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TONOS DE LUZ */}
      {accessory.lightTones?.length > 0 && (
        <section className="content-section">
          <div className="section-header">
            <h2 className="section-title">Tonos de luz</h2>
          </div>
          <div className="light-tones-grid">
            {accessory.lightTones.map((tone) => (
              <div key={tone.id} className="light-tone-item">
                <p className="light-tone-name">{tone.name}</p>
                {tone.kelvin && <p className="light-tone-kelvin">{tone.kelvin}K</p>}
              </div>
            ))}
          </div>
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
