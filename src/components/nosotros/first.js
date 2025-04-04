import Image from 'next/image';
import React from 'react';
import './nosotros.css';
import { IMG_URL } from '@/utils/constants';

export default function First() {
  return (
    <section className="flex responsive-container-nos gap-1 first">
      {/* two box with the same width */}
      <div className="flex-1   p-[var(--padding-chico)] flex flex-col justify-center text-center md:text-left">
        <h2 className="h2-title-nos">Quienes somos</h2>
        <p className="text-nuestra">
          Somos una empresa joven e innovadora con 10 años de crecimiento
          continuo. Buscamos contínuamente materiales, procesos y tecnologías
          que nos permitan crear luminarias con un diseño diferencial. Somos
          industria argentina, diseñamos, fabricamos, y creamos todos nuestros
          modelos desde nuesta planta en CABA. Somos flexibles, permitimos
          personalizaciones en nuestros modelos como ser colores, dimensiones,
          tonos de luz, etc. Brindamos garantía y un excelente servicio post
          venta que soluciona cualquier inconveniente.
        </p>
      </div>
      <div className="flex-1   p-[var(--padding-chico)] items-center justify-center align-middle">
        <Image
          src={`${IMG_URL}/bod-170.png`}
          width={300}
          height={300}
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
    </section>
  );
}
