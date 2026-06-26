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
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-transform hover:scale-110 active:scale-95"
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.404-2.652 4.04C3.85 15.978 5.487 19.129 8.113 20.5c1.214.606 2.343.922 3.29.922.955 0 1.87-.306 2.705-.915l.194-.124c1.863-1.402 3.01-3.309 3.266-5.556.256-2.246-.87-4.453-3.054-5.545-1.091-.578-2.368-.888-3.684-.888z" />
          </svg>
        )}
      </button>
    </>
  );
}
