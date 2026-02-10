'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Download,
  Info,
  Layers,
  Settings,
  Maximize2,
  Cpu,
  CheckCircle2,
  PlusCircle,
  FileText,
  Home,
} from 'lucide-react';

const R2_BASE_URL = 'https://pub-991b1e142013489ca0b64e1e314c7386.r2.dev';

export default function LedProfileDetailClient({ profile }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'use_cases'

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('productPageLoaded'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const allImages =
    profile.media?.filter((m) =>
      ['cover', 'gallery', 'tech', 'accessory'].includes(m.kind),
    ) || [];

  const pdfs =
    profile.media?.filter((m) =>
      ['datasheet', 'spec', 'pdf'].includes(m.kind),
    ) || [];

  const currentImage = allImages[selectedImageIndex];

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${R2_BASE_URL}/${path}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <Home size={14} /> Inicio
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/productos?categoria=Perfiles"
            className="hover:text-red-600 transition-colors"
          >
            Perfiles LED
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">{profile.code}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Sidebar - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
              {currentImage ? (
                <img
                  src={getImageUrl(currentImage.path)}
                  alt={currentImage.alt_text || profile.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-300">
                  <Maximize2 size={48} className="mb-4 opacity-20" />
                  <p>Sin imagen disponible</p>
                </div>
              )}
              <div className="absolute top-6 right-6">
                <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-white">
                  {profile.code}
                </div>
              </div>
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide text-center">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex
                        ? 'border-red-600 ring-4 ring-red-50'
                        : 'border-white hover:border-gray-200'
                    } bg-white`}
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

            {/* Technical Downloads Bar */}
            {pdfs.length > 0 && (
              <div className="bg-red-600 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-red-100">
                <div className="flex items-center gap-4 text-left">
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Documentación Técnica</h3>
                    <p className="text-red-100 text-sm">
                      Planos, medidas y especificaciones
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {pdfs.map((pdf, idx) => (
                    <a
                      key={idx}
                      href={getImageUrl(pdf.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-red-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-50 transition-colors shadow-lg"
                    >
                      <Download size={18} />
                      {pdf.kind === 'datasheet' ? 'Descargar PDF' : 'Ficha'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info Sidebar - 5 columns */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <header className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Performance Series
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {profile.name}
              </h1>
              <p className="text-gray-500 leading-relaxed text-lg">
                {profile.description}
              </p>
            </header>

            {/* Dynamic Tabs Section */}
            <div className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100">
              <div className="flex p-1 gap-1">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'specs' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Settings size={16} /> Especificaciones
                </button>
                <button
                  onClick={() => setActiveTab('use_cases')}
                  className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'use_cases' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Info size={16} /> Aplicaciones
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'specs' ? (
                  <div className="space-y-5">
                    {[
                      {
                        label: 'Código',
                        value: profile.code,
                        icon: <Cpu size={14} />,
                      },
                      {
                        label: 'Material',
                        value: profile.material,
                        icon: <Layers size={14} />,
                      },
                      {
                        label: 'Superficie',
                        value: profile.finish_surface,
                        icon: <Layers size={14} />,
                      },
                      {
                        label: 'Carga Máx',
                        value: profile.max_w_per_m
                          ? `${profile.max_w_per_m} W/m`
                          : 'N/A',
                        icon: <CheckCircle2 size={14} />,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center group"
                      >
                        <span className="text-gray-400 text-sm flex items-center gap-2">
                          {item.icon} {item.label}
                        </span>
                        <span className="font-bold text-gray-800 text-sm group-hover:text-red-600 transition-colors">
                          {item.value || 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {profile.use_cases ||
                        'No se han especificado casos de uso para este modelo.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Finishes Section */}
            {profile.finishes && profile.finishes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                  Acabados Disponibles
                </h3>
                <div className="flex flex-wrap gap-4">
                  {profile.finishes.map((finish, idx) => (
                    <div key={idx} className="group cursor-help relative">
                      {finish.hex_color ? (
                        <div
                          className="w-10 h-10 rounded-full border-2 border-white shadow-md transition-all group-hover:scale-125 group-hover:rotate-6 ring-1 ring-gray-100"
                          style={{ backgroundColor: finish.hex_color }}
                        />
                      ) : finish.swatch_url ? (
                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden transition-all group-hover:scale-125 ring-1 ring-gray-100">
                          <img
                            src={getImageUrl(finish.swatch_url)}
                            alt={finish.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400 uppercase">
                          {finish.name.substring(0, 2)}
                        </div>
                      )}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-0.5 rounded uppercase tracking-widest z-50 pointer-events-none">
                        {finish.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technical Sections Grid */}
        <div className="mt-24 space-y-20 text-left">
          {/* Diffusers & Included Accessories */}
          <div className="grid lg:grid-cols-2 gap-12">
            {profile.diffusers && profile.diffusers.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-red-600">
                    <Layers size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Difusores Compatibles
                  </h2>
                </div>
                <div className="grid gap-4">
                  {profile.diffusers.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-red-100 transition-all"
                    >
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {item.diffuser?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 italic">
                          {item.notes}
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${item.included_by_m ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}
                      >
                        {item.included_by_m ? '✓ Incluido' : 'Opcional'}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {profile.included_accessories &&
              profile.included_accessories.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-red-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Kit Incluido
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {profile.included_accessories.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-red-100 transition-all"
                      >
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-gray-300">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 leading-tight">
                              {item.accessory?.name}
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                              Cantidad: {item.qty_per_m} u/m
                            </p>
                          </div>
                        </div>
                        <CheckCircle2 className="text-green-500" size={20} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </div>

          {/* Optional & Parts - Full Width */}
          <div className="grid lg:grid-cols-2 gap-12">
            {profile.optional_accessories &&
              profile.optional_accessories.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-red-600">
                      <PlusCircle size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Adicionales
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.optional_accessories.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-5 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all group"
                      >
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {profile.parts && profile.parts.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-red-600">
                    <Maximize2 size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">
                    Componentes
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.parts.map((part, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden group rounded-[32px] border-2 transition-all p-4 bg-white ${part.included ? 'border-green-100 bg-green-50/20' : 'border-gray-100'}`}
                    >
                      {part.photo_path ? (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-50">
                          <img
                            src={getImageUrl(part.photo_path)}
                            alt={part.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-2xl bg-gray-50 mb-4 flex items-center justify-center text-gray-300">
                          <Maximize2 size={24} />
                        </div>
                      )}
                      <h3 className="font-bold text-gray-900">{part.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {part.included ? '✓ Sistema' : 'Extra'}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${part.included ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
