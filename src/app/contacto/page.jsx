'use client';
import DynamicForm from '@/components/form/DynamicForm';
import HeroBlack from '@/components/hero/hero-black';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';

const formFields = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Nombre y Apellido',
    validation: {
      required: 'El nombre y apellido son obligatorios.',
      minLength: {
        value: 5,
        message: 'El nombre y apellido deben tener al menos 3 caracteres.',
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

let words =
  '¿Tienes alguna consulta o necesitas ayuda? ¡Nos encantaría escucharte! Ponete en contacto con nosotros a través de nuestras redes. Nuestro equipo de atención está aquí para responderte a la brevedad y brindarte la asistencia que necesites.';

const Contacto = () => {
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data, reset) => {
    // const serviceId = import.meta.env.VITE_SERVICE_ID
    // const templateId = import.meta.env.VITE_TEMPLATE_ID
    // const publicKey = import.meta.env.VITE_PUBLIC_KEY
    console.log('Datos del formulario:', data);
    setIsLoading(true);
    // emailjs
    //   .send(serviceId, templateId, data, publicKey)
    //   .then(() => {
    //     setIsLoading(false)
    //     setIsSubmitted(true)
    //     reset()

    //     setTimeout(() => {
    //       setIsSubmitted(false)
    //     }, 10000)
    //   })
    //   .catch((error) => {
    //     setIsLoading(false)
    //     console.error('Error al enviar el email:', error)
    //   })
    reset();
  };
  return (
    <div className="p-[var(--padding-generico-x-y)] ">
      <HeroBlack title="Contacto" />

      <TextGenerateEffect
        words={words}
        duration={0.1}
        className="flex-1  p-[var(--padding-generico-y)]"
      />
      <DynamicForm
        fields={formFields}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8"
      />
    </div>
  );
};

export default Contacto;
