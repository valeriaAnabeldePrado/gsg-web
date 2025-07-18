import Image from 'next/image';
import React from 'react';
import './nosotros.css';
import { IMG_URL } from '@/utils/constants';
import { BsNut } from 'react-icons/bs';

export default function Second() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16 items-start">
          {/* Images Section */}
          <section className="  flex lg:flex-row flex-col lg:gap-16 gap-12">
            <div className="space-y-6 lg:w-1/2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={`${IMG_URL}/p01-op.png`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    alt="Diseño e innovación"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={`${IMG_URL}/wal-600.png`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    alt="Tecnología avanzada"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>

              {/* Technology showcase */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ">
                <h3 className="h2-title-nos  font-semibold text-gray-800 mb-4 text-center">
                  Tecnología de Vanguardia
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="px-6 py-4 bg-gray-50 rounded-lg">
                    <div className="text-5xl mb-2">⚙️</div>
                    <p className="text-sm font-medium text-gray-700">
                      Tornos CNC
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 rounded-lg">
                    <div className="text-4xl mb-2">⚡</div>
                    <p className="text-sm font-medium text-gray-700">
                      Soldadora Láser
                    </p>
                  </div>
                  <div className="px-6 py-10 bg-gray-50 rounded-lg">
                    <div className="text-4xl mb-2">📐</div>
                    <p className="text-sm font-medium text-gray-700">
                      Corte Láser
                    </p>
                  </div>
                  <div className="px-6 py-10 bg-gray-50 rounded-lg">
                    <div className="text-4xl mb-2">🏭</div>
                    <p className="text-sm font-medium text-gray-700">
                      Producción Eficiente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white lg:w-1/2 w-full rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <h2 className="h2-title-nos text-left mb-0">
                  Diseño e innovación
                </h2>
              </div>
              <p className="text-nuestra leading-relaxed">
                Trabajamos dia a día en cada nuevo desafío de diseño comenzando
                por experimentación de nuevos materiales y tecnologías,
                morfologías y usos contemplando la viabilidad y confort visual
                en cada uno de nuestros proyectos.
              </p>
              <p className="text-nuestra leading-relaxed mt-4">
                Seguimos las últimas tendencias mundiales en iluminación y
                tecnología. Trabajamos en cada desafío teniendo como punto clave
                la innovación en el ámbito del diseño.
              </p>
            </div>
          </section>
          {/* Content Section */}
          <div className="space-y-12 ">
            {/* Diseño e innovación */}

            {/* Mejora continua */}
            <section className="  flex lg:flex-row flex-col lg:gap-16 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <h2 className="h2-title-nos text-left mb-0">
                    Mejora continua
                  </h2>
                </div>
                <p className="text-nuestra leading-relaxed">
                  Creemos que siempre se puede mejorar y estamos continuamente
                  buscando mejoras en productos o procesos para superarnos día a
                  día y ofrecer a nuestros clientes la calidad buscada.
                </p>
              </div>
              {/* Tecnología */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <h2 className="h2-title-nos text-left mb-0">Tecnología</h2>
                </div>
                <p className="text-nuestra leading-relaxed">
                  Contamos con maquinaria de última tecnología como tornos CNC,
                  soldadora laser, maquina de corte laser y todo lo necesario
                  para producir a bajo costo y con la mejor terminación.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
