'use client';

import { useState, useEffect } from 'react';
import '../../productos/product-detail.css';
import './fuente-detail.css';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

// Margen de trabajo recomendado en el catálogo: hasta el 80% de la potencia nominal
const LOAD_FACTOR = 0.8;

function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${R2_BASE_URL}/${path}`;
}

// 3,5 en vez de 3.5 (formato del catálogo)
const fmt = (n, decimals) => {
  if (n == null || n === '') return '';
  const num = Number(n);
  const str = decimals != null ? num.toFixed(decimals) : String(num);
  return str.replace('.', ',');
};

const inputRange = (m) =>
  m.input_v_min != null && m.input_v_max != null
    ? `${m.input_v_min} a ${m.input_v_max} VAC`
    : m.input_label;

export default function PowerSupplyDetailClient({ powerSupply: ps }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedModelId, setSelectedModelId] = useState(ps.models[0]?.id ?? null);
  const [stripWattsPerMeter, setStripWattsPerMeter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const allImages = [
    ...(ps.photoUrl ? [{ path: ps.photoUrl, alt_text: ps.name }] : []),
    ...ps.media.filter((m) => m.kind === 'gallery'),
  ];
  const currentImage = allImages[selectedImageIndex];
  const techImages = ps.media.filter((m) => m.kind === 'tech');
  const pdfs = ps.media.filter((m) => m.kind === 'datasheet');
  const selectedModel = ps.models.find((m) => m.id === selectedModelId);

  const usableWatts = ps.powerW != null ? Math.floor(ps.powerW * LOAD_FACTOR) : null;
  const wpm = Number(String(stripWattsPerMeter).replace(',', '.'));
  const maxMeters = usableWatts != null && wpm > 0 ? usableWatts / wpm : null;

  const hasDims = ps.lengthMm != null && ps.widthMm != null && ps.heightMm != null;

  const specs = [
    hasDims && {
      label: 'Medidas',
      value: `${fmt(ps.lengthMm)} × ${fmt(ps.widthMm)} × ${fmt(ps.heightMm)} mm`,
      hint: 'largo, ancho y alto',
    },
    ps.ipRating && {
      label: 'Protección',
      value: ps.ipRating,
      hint: ps.ipRating === 'IP20' ? 'para uso en interior' : null,
    },
    ps.connection && { label: 'Conexión', value: ps.connection },
    ps.warrantyYears != null && {
      label: 'Garantía',
      value: `${ps.warrantyYears} ${ps.warrantyYears === 1 ? 'año' : 'años'}`,
    },
    ps.dimmable && { label: 'Regulación', value: '4 niveles por DIP' },
  ].filter(Boolean);

  return (
    <div className="product-detail-page">
      <section className="product-body">
        <div className="product-body-container">
          <div className="product-gallery">
            <div className="gallery-main-image">
              {currentImage ? (
                <img
                  src={getImageUrl(currentImage.path)}
                  alt={currentImage.alt_text || ps.name}
                />
              ) : (
                <div style={{ color: '#999', fontSize: '0.9rem' }}>
                  Sin imagen disponible
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="gallery-thumbnails">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`gallery-thumbnail ${idx === selectedImageIndex ? 'active' : ''}`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <img src={getImageUrl(img.path)} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info ps-info">
            <h1 className="ps-title">{ps.name}</h1>
            {ps.description && <p className="ps-lead">{ps.description}</p>}

            {/* Elección de voltaje: cada opción muestra su código y corriente */}
            {ps.models.length > 0 && (
              <div className="ps-voltages" role="radiogroup" aria-label="Voltaje de salida">
                {ps.models.map((m) => {
                  const active = m.id === selectedModelId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedModelId(m.id)}
                      className={`ps-voltage ${active ? 'is-active' : ''}`}
                    >
                      <span className="ps-voltage-value">
                        {fmt(m.output_v)}
                        <span className="ps-voltage-unit"> V</span>
                      </span>
                      <span className="ps-voltage-current">
                        {m.current_a != null ? `${fmt(m.current_a)} A de salida` : 'Corriente continua'}
                      </span>
                      <span className="ps-voltage-code">{m.code}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {selectedModel && (
              <p className="ps-model-note">
                Funciona con tensión de red de {inputRange(selectedModel)} y entrega{' '}
                {fmt(selectedModel.output_v)} V de corriente continua. Elegí el mismo
                voltaje que tu tira LED.
              </p>
            )}

            {/* Potencia + carga recomendada + calculadora */}
            {ps.powerW != null && (
              <div className="ps-power">
                <div className="ps-power-figures">
                  <p>
                    <strong>{fmt(ps.powerW)} W</strong>
                    <span>potencia nominal</span>
                  </p>
                  <p>
                    <strong>{usableWatts} W</strong>
                    <span>carga recomendada, el 80% para mayor vida útil</span>
                  </p>
                </div>

                <div className="ps-calc">
                  <label className="ps-calc-row">
                    <span>¿Cuántos metros de tira alimenta? Si tu tira consume</span>
                    <span className="ps-calc-field">
                      <input
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="9,6"
                        aria-label="Consumo de la tira en watts por metro"
                        value={stripWattsPerMeter}
                        onChange={(e) => setStripWattsPerMeter(e.target.value.replace(/[^0-9.,]/g, ''))}
                      />
                      W/m
                    </span>
                  </label>
                  <p className="ps-calc-answer" aria-live="polite">
                    {maxMeters != null ? (
                      <>
                        alcanza para <strong className="ps-calc-result">{fmt(maxMeters, 1)} m</strong> de tira.
                      </>
                    ) : (
                      'Ingresá el consumo por metro que figura en la ficha de tu tira.'
                    )}
                  </p>
                </div>
              </div>
            )}

            {specs.length > 0 && (
              <dl className="ps-specs">
                {specs.map((s) => (
                  <div key={s.label} className="ps-spec">
                    <dt>{s.label}</dt>
                    <dd>
                      {s.value}
                      {s.hint && <span>{s.hint}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {pdfs.length > 0 && (
              <div className="ps-downloads">
                {pdfs.map((pdf) => (
                  <a
                    key={pdf.id}
                    href={getImageUrl(pdf.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-download"
                  >
                    Descargar ficha técnica (PDF)
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {(ps.dimmable || techImages.length > 0) && (
        <section className="ps-dimming">
          <div className="ps-dimming-text">
            <h2>
              {ps.dimmable
                ? 'Cuatro niveles de luz desde la misma fuente'
                : 'Detalle técnico'}
            </h2>
            {ps.dimmable && (
              <p>
                Con los interruptores DIP del lateral elegís si la tira trabaja al
                25%, 50%, 75% o 100% de su luminosidad.
              </p>
            )}
          </div>
          <div className="ps-dimming-images">
            {techImages.map((img) => (
              <img
                key={img.id}
                src={getImageUrl(img.path)}
                alt={img.alt_text || `${ps.name}: detalle técnico`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
