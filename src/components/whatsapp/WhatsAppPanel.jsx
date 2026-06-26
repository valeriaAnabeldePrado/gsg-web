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
    router.push('/distribuidores');
    onClose();
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg z-40 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">GSG</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {step === 'initial' && (
          <div className="space-y-3">
            <p className="text-gray-700 text-sm mb-4">¡Hola! ¿En qué podemos ayudarte?</p>
            <button
              onClick={handleOption1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Tengo un negocio y quiero conocer GSG
            </button>
            <button
              onClick={handleOption2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Ya soy cliente de GSG
            </button>
            <button
              onClick={() => onStepChange('provinces')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Soy arquitecto o diseñador de interiores
            </button>
            <button
              onClick={() => onStepChange('provinces')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Busco un punto de venta cerca mío
            </button>
          </div>
        )}

        {step === 'provinces' && (
          <div className="space-y-3">
            <p className="text-gray-700 text-sm mb-4">Te conectamos con el distribuidor más cercano. ¿En qué provincia estás?</p>
            <ProvinceSelector value={selectedProvince} onChange={setSelectedProvince} />
            <button
              onClick={handleViewDistributors}
              disabled={!selectedProvince}
              className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                selectedProvince
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Ver distribuidores
            </button>
            <button
              onClick={() => onStepChange('initial')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
