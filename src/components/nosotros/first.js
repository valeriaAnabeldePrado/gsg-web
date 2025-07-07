import Image from 'next/image';
import React from 'react';
import './nosotros.css';
import { IMG_URL } from '@/utils/constants';

export default function First() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="h2-title-nos text-left">Quienes somos</h2>
              <div className="space-y-4">
                <p className="text-nuestra leading-relaxed">
                  Somos una empresa joven e innovadora con 10 años de
                  crecimiento continuo. Buscamos contínuamente materiales,
                  procesos y tecnologías que nos permitan crear luminarias con
                  un diseño diferencial.
                </p>
                <p className="text-nuestra leading-relaxed">
                  Somos industria argentina, diseñamos, fabricamos, y creamos
                  todos nuestros modelos desde nuesta planta en CABA. Somos
                  flexibles, permitimos personalizaciones en nuestros modelos
                  como ser colores, dimensiones, tonos de luz, etc.
                </p>
                <p className="text-nuestra leading-relaxed">
                  Brindamos garantía y un excelente servicio post venta que
                  soluciona cualquier inconveniente.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">🏭</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Industria Nacional
                </h3>
                <p className="text-sm text-gray-600">
                  Fabricación 100% argentina
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Personalización
                </h3>
                <p className="text-sm text-gray-600">
                  Colores, dimensiones y tonos
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Garantía</h3>
                <p className="text-sm text-gray-600">
                  Servicio post venta integral
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full h-full">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-full ">
              <Image
                src={`${IMG_URL}/bod-170.png`}
                fill
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                alt="Nuestra planta de fabricación"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-[1023px]:hidden">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">10+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
