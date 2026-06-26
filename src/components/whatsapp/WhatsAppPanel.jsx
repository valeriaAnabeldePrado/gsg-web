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
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896.003-3.176-1.24-6.165-3.479-8.45zM12.045 21.785h-.005c-1.777 0-3.518-.477-5.04-1.378l-.36-.214-3.742.979 1.003-3.648-.235-.374c-.993-1.571-1.517-3.388-1.516-5.25.003-5.45 4.446-9.884 9.899-9.884 2.64 0 5.122 1.028 6.988 2.892 1.866 1.863 2.893 4.338 2.892 6.974-.003 5.449-4.447 9.883-9.884 9.883zm5.422-7.403c-.297-.148-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.297.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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
