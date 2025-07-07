'use client';
import DynamicForm from '@/components/form/DynamicForm';
import './contacto.css';
import emailjs from '@emailjs/browser';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { useState } from 'react';
import React from 'react';
import GenericHero from '@/components/hero/genericHero';

const formFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Nombre y Apellido',
    validation: {
      required: 'El nombre y apellido son obligatorios.',
      minLength: {
        value: 5,
        message: 'El nombre y apellido deben tener al menos 5 caracteres.',
      },
    },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Correo Electrónico',
    validation: {
      required: 'El correo electrónico es obligatorio.',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Por favor, introduce un correo electrónico válido.',
      },
    },
  },
  {
    name: 'comments',
    type: 'textarea',
    label: 'Comentarios',
    validation: {
      required: 'Por favor, introduce tus comentarios.',
      minLength: {
        value: 10,
        message: 'Los comentarios deben tener al menos 10 caracteres.',
      },
    },
  },
];

const words =
  '¿Tienes alguna consulta o necesitas ayuda? ¡Nos encantaría escucharte! Nuestro equipo de atención está aquí para responderte a la brevedad y brindarte la asistencia que necesites.';

const Contacto = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data, reset) => {
    setIsLoading(true);
    const templateId = process.env.NEXT_PUBLIC_ID_TEMPLATE;
    const serviceId = process.env.NEXT_PUBLIC_ID_SERVICE;
    const publicKey = process.env.NEXT_PUBLIC_ID_PUBLICKEY;

    emailjs
      .send(serviceId, templateId, data, publicKey)
      .then(() => {
        setIsSubmitted(true);
        setIsLoading(false);
        reset();

        setTimeout(() => {
          setIsSubmitted(false);
        }, 10000);
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="p-[var(--padding-generico-x-y)] bg-white">
        <GenericHero titleHero={'CONTÁCTATE CON NOSOTROS'} />

        <div className="mt-8 max-w-4xl mx-auto">
          <TextGenerateEffect
            words={words}
            duration={0.1}
            className="text-center text-lg text-gray-600 leading-relaxed"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16 px-[var(--padding-generico-x-y)]">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-medium">
                  ¡Muchas gracias por comunicarte! Un asesor se contactará a la
                  brevedad.
                </span>
              </div>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="h2-hero-title md:text-4xl font-bold text-gray-900 mb-4">
                Envíanos tu mensaje
              </h2>
              <p className="text-lg text-gray-600 mt-10">
                Completa el formulario y nos pondremos en contacto contigo lo
                antes posible.
              </p>
            </div>

            <DynamicForm
              fields={formFields}
              onSubmit={handleSubmit}
              className=""
            />

            {/* Loading State */}
            {isLoading && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 text-red-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                  <span>Enviando mensaje...</span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@gsg.com.ar</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600">+54 11 1234-5678</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
              <p className="text-gray-600">Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
