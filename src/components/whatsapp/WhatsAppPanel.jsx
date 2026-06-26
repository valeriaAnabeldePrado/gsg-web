'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProvinceSelector from './ProvinceSelector';
import { WHATSAPP_CONTACTS, getWhatsAppLink } from '@/lib/whatsapp/constants';

export default function WhatsAppPanel({ isOpen, step, onClose, onStepChange }) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState('');

  if (!isOpen) return null;

  const handleOption1 = () => {
    const link = getWhatsAppLink(WHATSAPP_CONTACTS.ezequiel.number, WHATSAPP_CONTACTS.ezequiel.message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleOption2 = () => {
    const link = getWhatsAppLink(WHATSAPP_CONTACTS.tomas.number, WHATSAPP_CONTACTS.tomas.message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleViewDistributors = () => {
    onClose();
    router.push('/distribuidores');
  };

  return (
    <div
      className="fixed bottom-24 right-4 z-40 w-[320px] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
    >
      {/* Header */}
      <div style={{ background: '#25D366' }} className="px-5 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.404-2.652 4.04C3.85 15.978 5.487 19.129 8.113 20.5c1.214.606 2.343.922 3.29.922.955 0 1.87-.306 2.705-.915l.194-.124c1.863-1.402 3.01-3.309 3.266-5.556.256-2.246-.87-4.453-3.054-5.545-1.091-.578-2.368-.888-3.684-.888z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-tight">GSG Design</p>
          <p className="text-white/80 text-xs">Atención al cliente</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors ml-2 flex-shrink-0"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="bg-white px-4 py-4">
        {step === 'initial' && (
          <>
            {/* Bubble greeting */}
            <div className="mb-4">
              <div
                className="inline-block rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 leading-relaxed"
                style={{ background: '#f0f0f0', maxWidth: '90%' }}
              >
                ¡Hola! ¿En qué podemos ayudarte?
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Tengo un negocio y quiero conocer GSG', onClick: handleOption1 },
                { label: 'Ya soy cliente de GSG', onClick: handleOption2 },
                { label: 'Soy arquitecto o diseñador de interiores', onClick: () => onStepChange('provinces') },
                { label: 'Busco un punto de venta cerca mío', onClick: () => onStepChange('provinces') },
              ].map(({ label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium flex items-center gap-3 transition-all duration-150"
                  style={{
                    borderColor: '#e0e0e0',
                    color: '#333',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#E05A2B';
                    e.currentTarget.style.color = '#E05A2B';
                    e.currentTarget.style.background = '#fff5f2';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.color = '#333';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <span className="flex-1">{label}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0 opacity-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'provinces' && (
          <>
            <div className="mb-4">
              <div
                className="inline-block rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 leading-relaxed"
                style={{ background: '#f0f0f0', maxWidth: '95%' }}
              >
                Te conectamos con el distribuidor más cercano. ¿En qué provincia estás?
              </div>
            </div>

            <div className="space-y-3">
              <ProvinceSelector value={selectedProvince} onChange={setSelectedProvince} />

              <button
                onClick={handleViewDistributors}
                disabled={!selectedProvince}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{
                  background: selectedProvince ? '#25D366' : '#e0e0e0',
                  color: selectedProvince ? 'white' : '#999',
                  cursor: selectedProvince ? 'pointer' : 'not-allowed',
                }}
              >
                Ver distribuidores
              </button>

              <button
                onClick={() => onStepChange('initial')}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-1"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white px-4 pb-3 text-center">
        <p className="text-[10px] text-gray-400">Powered by WhatsApp</p>
      </div>
    </div>
  );
}
