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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-4 right-4 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-colors"
        aria-label="Open WhatsApp chat"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.514.857-2.755 2.017-3.635 3.37C2.323 10.487 1.891 12.3 1.891 14.196c0 1.289.24 2.552.708 3.762L1.77 23.776l4.218-1.107c1.126.625 2.379.922 3.587.922h.005c5.087 0 9.286-4.13 9.286-9.209 0-2.462-.987-4.782-2.773-6.522a9.095 9.095 0 00-6.514-2.686zM12 21.557c-1.117 0-2.21-.189-3.257-.537l-.235-.12-2.428.638.650-2.373-.154-.246a8.065 8.065 0 011.119-13.153 8.207 8.207 0 015.948 2.27c1.628 1.558 2.526 3.634 2.526 5.861 0 4.775-3.882 8.659-8.66 8.659z" />
        </svg>
      </button>

      {/* WhatsApp Panel */}
      <WhatsAppPanel
        isOpen={isOpen}
        step={step}
        onClose={handleClose}
        onStepChange={handleStepChange}
      />
    </>
  );
}
