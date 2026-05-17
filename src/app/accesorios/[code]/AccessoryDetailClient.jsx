'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${R2_BASE_URL}/${path}`;
}

function getKelvinColor(kelvin) {
  if (!kelvin) return '#9CA3AF';
  if (kelvin >= 2700 && kelvin <= 3200) return '#FDB813';
  if (kelvin > 3200 && kelvin <= 4500) return '#FFF4E0';
  if (kelvin > 4500 && kelvin <= 5500) return '#FFFFFF';
  if (kelvin > 5500) return '#E0F0FF';
  return '#9CA3AF';
}

export default function AccessoryDetailClient({ accessory }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const tipoClass = 'bg-gray-100 text-gray-700';

  const allImages =
    accessory.media?.filter((m) => m.kind === 'gallery' || m.kind === 'tech') || [];
  if (allImages.length === 0 && accessory.photoUrl) {
    allImages.push({ path: accessory.photoUrl, kind: 'gallery', alt_text: accessory.name });
  }
  const currentImage = allImages[selectedImageIndex];
  const datasheet = accessory.media?.find((m) => m.kind === 'datasheet');

  const sp = accessory.specs || {};
  const hasVoltageSpecs =
    sp.power?.['12v_w'] != null || sp.power?.['24v_w'] != null ||
    sp.amperage?.['12v_a'] != null || sp.amperage?.['24v_a'] != null;

  const specCards = [];
  if (accessory.watt) {
    specCards.push({ label: 'Potencia', value: `${accessory.watt}W`, sub: sp.power?.['12v_w'] || sp.power?.['24v_w'] ? `12V: ${sp.power?.['12v_w'] || '-'}W / 24V: ${sp.power?.['24v_w'] || '-'}W` : null });
  }
  if (accessory.amperage) {
    specCards.push({ label: 'Amperaje', value: `${accessory.amperage}A`, sub: sp.amperage?.['12v_a'] || sp.amperage?.['24v_a'] ? `12V: ${sp.amperage?.['12v_a'] || '-'}A / 24V: ${sp.amperage?.['24v_a'] || '-'}A` : null });
  }
  if (sp.power?.['12v_w'] != null && !accessory.watt) specCards.push({ label: 'Potencia 12V', value: `${sp.power['12v_w']}W` });
  if (sp.power?.['24v_w'] != null && !accessory.watt) specCards.push({ label: 'Potencia 24V', value: `${sp.power['24v_w']}W` });
  if (sp.amperage?.['12v_a'] != null && !accessory.amperage) specCards.push({ label: 'Amperaje 12V', value: `${sp.amperage['12v_a']}A` });
  if (sp.amperage?.['24v_a'] != null && !accessory.amperage) specCards.push({ label: 'Amperaje 24V', value: `${sp.amperage['24v_a']}A` });
  if (accessory.voltageLabel) specCards.push({ label: 'Voltaje', value: `${accessory.voltageLabel}`, sub: accessory.voltageMin && accessory.voltageMax ? `${accessory.voltageMin}V - ${accessory.voltageMax}V` : null });
  if (sp.signal_type) specCards.push({ label: 'Señal / Tipo', value: sp.signal_type });
  if (sp.reach_or_total) specCards.push({ label: 'Alcance / Total', value: sp.reach_or_total });
  if (sp.led_type) specCards.push({ label: 'LED / Tipo', value: sp.led_type });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Volver
        </button>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-gray-50">
              {currentImage ? (
                <div className="h-72 sm:h-96 lg:h-full cursor-pointer group" onClick={() => setLightboxOpen(true)}>
                  <img src={getImageUrl(currentImage.path)} alt={currentImage.alt_text || accessory.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                      <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-72 sm:h-96 lg:h-full items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">Sin imagen</p>
                  </div>
                </div>
              )}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((img, idx) => (
                      <button key={idx} onClick={() => setSelectedImageIndex(idx)} className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImageIndex ? 'border-white shadow-lg ring-2 ring-blue-500' : 'border-white/60 opacity-70 hover:opacity-100'}`}>
                        <img src={getImageUrl(img.path)} alt={`Vista ${idx + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <div>
                {accessory.tipo && <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tipoClass}`}>{accessory.tipo}</span>}
                <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">{accessory.name}</h1>
                <p className="mt-1 font-mono text-sm text-gray-500">{accessory.code}</p>
              </div>
              {accessory.description && <div className="mt-5"><p className="text-gray-600 leading-relaxed whitespace-pre-line">{accessory.description}</p></div>}
              {accessory.notes && (
                <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">{accessory.notes}</p>
                </div>
              )}
              {datasheet && (
                <div className="mt-auto pt-6">
                    <a href={getImageUrl(datasheet.path)} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    Descargar ficha tecnica (PDF)
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spec Cards */}
        {specCards.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Especificaciones Tecnicas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {specCards.map((card, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">{card.label}</p>
                  <p className="text-xl font-bold text-gray-900">{card.value}</p>
                  {card.sub && <p className="text-xs text-gray-500 mt-1 truncate">{card.sub}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voltage Table */}
        {hasVoltageSpecs && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Rendimiento por voltaje</h2>
              <p className="text-sm text-gray-500">Comparativa segun el voltaje de operacion</p>
            </div>
            <div className="p-6">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 font-medium text-gray-500">Parametro</th>
                      {sp.power?.['12v_w'] != null || sp.amperage?.['12v_a'] != null ? (
                        <th className="px-4 py-3 font-semibold text-gray-700">12V</th>
                      ) : null}
                      {sp.power?.['24v_w'] != null || sp.amperage?.['24v_a'] != null ? (
                        <th className="px-4 py-3 font-semibold text-gray-700">24V</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(sp.power?.['12v_w'] != null || sp.power?.['24v_w'] != null) && (
                      <tr className="bg-white">
                        <td className="px-4 py-3.5 font-medium text-gray-700">Potencia (W)</td>
                        {sp.power?.['12v_w'] != null || sp.amperage?.['12v_a'] != null ? (
                          <td className="px-4 py-3.5">{sp.power?.['12v_w'] != null ? <span className="text-lg font-bold">{sp.power['12v_w']} <span className="text-sm font-normal text-gray-500">W</span></span> : <span className="text-gray-400">—</span>}</td>
                        ) : null}
                        {sp.power?.['24v_w'] != null || sp.amperage?.['24v_a'] != null ? (
                          <td className="px-4 py-3.5">{sp.power?.['24v_w'] != null ? <span className="text-lg font-bold">{sp.power['24v_w']} <span className="text-sm font-normal text-gray-500">W</span></span> : <span className="text-gray-400">—</span>}</td>
                        ) : null}
                      </tr>
                    )}
                    {(sp.amperage?.['12v_a'] != null || sp.amperage?.['24v_a'] != null) && (
                      <tr className="bg-white">
                        <td className="px-4 py-3.5 font-medium text-gray-700">Amperaje (A)</td>
                        {sp.power?.['12v_w'] != null || sp.amperage?.['12v_a'] != null ? (
                          <td className="px-4 py-3.5">{sp.amperage?.['12v_a'] != null ? <span className="text-lg font-bold">{sp.amperage['12v_a']} <span className="text-sm font-normal text-gray-500">A</span></span> : <span className="text-gray-400">—</span>}</td>
                        ) : null}
                        {sp.power?.['24v_w'] != null || sp.amperage?.['24v_a'] != null ? (
                          <td className="px-4 py-3.5">{sp.amperage?.['24v_a'] != null ? <span className="text-lg font-bold">{sp.amperage['24v_a']} <span className="text-sm font-normal text-gray-500">A</span></span> : <span className="text-gray-400">—</span>}</td>
                        ) : null}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {(sp.power_12v_raw || sp.power_24v_raw || sp.amperage_12v_raw || sp.amperage_24v_raw) && (
                <div className="mt-4 rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Datos originales del fabricante</p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {sp.power_12v_raw && <div><p className="text-xs text-gray-400">Potencia 12V</p><p className="font-mono text-sm text-gray-700">{sp.power_12v_raw}</p></div>}
                    {sp.power_24v_raw && <div><p className="text-xs text-gray-400">Potencia 24V</p><p className="font-mono text-sm text-gray-700">{sp.power_24v_raw}</p></div>}
                    {sp.amperage_12v_raw && <div><p className="text-xs text-gray-400">Amperaje 12V</p><p className="font-mono text-sm text-gray-700">{sp.amperage_12v_raw}</p></div>}
                    {sp.amperage_24v_raw && <div><p className="text-xs text-gray-400">Amperaje 24V</p><p className="font-mono text-sm text-gray-700">{sp.amperage_24v_raw}</p></div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Finishes & Tones */}
        {(accessory.finishes?.length > 0 || accessory.lightTones?.length > 0) && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {accessory.finishes?.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Acabados Disponibles</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {accessory.finishes.map((finish) => (
                    <div key={finish.id} className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg">
                      {finish.hex_color && <span className="h-5 w-5 rounded-full border border-gray-300 shrink-0" style={{ backgroundColor: finish.hex_color }} />}
                      <span className="text-sm font-medium text-gray-700">{finish.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {accessory.lightTones?.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Tonos de Luz</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {accessory.lightTones.map((tone) => (
                    <div key={tone.id} className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg">
                      <span className="h-5 w-5 rounded-full border border-gray-300 shrink-0" style={{ backgroundColor: getKelvinColor(tone.kelvin), boxShadow: `0 0 6px ${getKelvinColor(tone.kelvin)}` }} />
                      <div>
                        <span className="text-sm font-medium text-gray-700">{tone.name}</span>
                        {tone.kelvin && <span className="text-xs text-gray-500 ml-1">({tone.kelvin}K)</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setLightboxOpen(false)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={getImageUrl(currentImage.path)} alt="Vista ampliada" className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
