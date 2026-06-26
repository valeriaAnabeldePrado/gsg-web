'use client';

import { useState } from 'react';
import WhatsAppPanel from './WhatsAppPanel';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('initial');

  const handleClose = () => {
    setIsOpen(false);
    setStep('initial');
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <>
      <WhatsAppPanel
        isOpen={isOpen}
        step={step}
        onClose={handleClose}
        onStepChange={handleStepChange}
      />

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat de WhatsApp"
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-transform hover:scale-110 active:scale-95"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 16px rgba(37,211,102,0.5)',
        }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896.003-3.176-1.24-6.165-3.479-8.45zM12.045 21.785h-.005c-1.777 0-3.518-.477-5.04-1.378l-.36-.214-3.742.979 1.003-3.648-.235-.374c-.993-1.571-1.517-3.388-1.516-5.25.003-5.45 4.446-9.884 9.899-9.884 2.64 0 5.122 1.028 6.988 2.892 1.866 1.863 2.893 4.338 2.892 6.974-.003 5.449-4.447 9.883-9.884 9.883zm5.422-7.403c-.297-.148-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.297.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        )}
      </button>
    </>
  );
}
