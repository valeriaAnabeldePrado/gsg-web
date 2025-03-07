'use client';
import DynamicForm from '@/components/form/DynamicForm';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (data, reset) => {
    const templateId = process.env.NEXT_PUBLIC_ID_TEMPLATE;
    const serviceId = process.env.NEXT_PUBLIC_ID_SERVICE;
    const publicKey = process.env.NEXT_PUBLIC_ID_PUBLICKEY;
    console.log(serviceId);
    console.log('Datos del formulario:', data);

    emailjs
      .send(serviceId, templateId, data, publicKey)
      .then(() => {
        setIsSubmitted(true);
        reset();

        setTimeout(() => {
          setIsSubmitted(false);
        }, 10000);
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
      });
    reset();
  };
  return (
    <div className="p-[var(--padding-generico-x-y)] ">
      <GenericHero />

      <TextGenerateEffect
        words={words}
        duration={0.1}
        className="flex-1  p-[var(--padding-generico-y)]"
      />
      <DynamicForm
        fields={formFields}
        onSubmit={handleSubmit}
        className="w-full mx-auto "
      />

      <p className={isSubmitted ? `opacity-100 mt-5` : `opacity-0`}>
        Muchas gracias por comunicarte, un asesor se contactará a la brevedad!
      </p>
    </div>
  );
};

export default Contacto;
