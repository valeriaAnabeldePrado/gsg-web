import Image from 'next/image';
import React from 'react';
import './nosotros.css';
import { IMG_URL } from '@/utils/constants';

export default function Second() {
  return (
    <section className="flex responsive-container-nos gap-1 first  items-start mt-10 ">
      <div className="flex-1  p-[var(--padding-chico)] items-center justify-center align-middle ">
        <div className="md:p-[var(--padding-chico)]  flex justify-center img-resp-display">
          <Image
            src={`${IMG_URL}/p01-op.png`}
            width={300}
            height={300}
            className="h-full w-full rounded-3xl t"
          />
        </div>
        <div className="md:p-[var(--padding-chico)]  flex justify-center mt-5 img-resp-display">
          <Image
            src={`${IMG_URL}/wal-600.png`}
            width={300}
            height={300}
            className="h-full w-full rounded-3xl t"
          />
        </div>
      </div>
      <div className="flex-1 p-[var(--padding-chico)] flex flex-col justify-center md:text-end  text-center gap-10">
        <div className="flex flex-col  ">
          <h2 className="h2-title-nos">Diseño e innovación</h2>
          <p className="text-nuestra">
            Trabajamos dia a día en cada nuevo desafío de diseño comenzando por
            experimentación de nuevos materiales y tecnologías, morfologías y
            usos contemplando la viabilidad y confort visual en cada uno de
            nuestros proyectos. Seguimos las últimas tendencias mundiales en
            iluminación y tecnología. Trabajamos en cada desafío teniendo como
            punto clave la innovación en el ámbito del diseño. Sabemos que de
            ese modo aportamos un diferencial en nuestros productos.
          </p>
        </div>
        <div className="flex flex-col   ">
          <h2 className="h2-title-nos">Mejora continua</h2>
          <p className="text-nuestra">
            Creemos que siempre se puede mejorar y estamos continuamente
            buscando mejoras en productos o procesos para superarnos día a día y
            ofrecer a nuestros clientes la calidad buscada
          </p>
        </div>
        <div className="flex flex-col ">
          <h2 className="h2-title-nos">Tecnología</h2>
          <p className="text-nuestra">
            Contamos con maquinaria de última tecnología como tornos CNC,
            soldadora laser, maquina de corte laser y todo lo necesario para
            producir a bajo costo y con la mejor terminación
          </p>
        </div>
      </div>
    </section>
  );
}
