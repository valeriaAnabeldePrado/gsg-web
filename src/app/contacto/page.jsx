import HeroBlack from '@/components/hero-black';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import React from 'react';

let words =
  '¿Tienes alguna consulta o necesitas ayuda? ¡Nos encantaría escucharte! Ponete en contacto con nosotros a través de nuestras redes. Nuestro equipo de atención está aquí para responderte a la brevedad y brindarte la asistencia que necesites.';

const Contacto = () => {
  return (
    <div className="p-[var(--padding-generico-x-y-pages-top)] ">
      <HeroBlack title="Contacto" />
      <TextGenerateEffect
        words={words}
        duration={0.1}
        className="flex-1  p-[var(--padding-generico-y)] "
      />
    </div>
  );
};

export default Contacto;
