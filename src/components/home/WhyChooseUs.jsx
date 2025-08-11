'use client';
import React from 'react';

export default function WhyChooseUs() {
  const ventajas = [
    {
      title: 'Tecnología LED Avanzada',
      description:
        'Productos con la última tecnología LED para máxima eficiencia energética y durabilidad que transforman cualquier espacio.',
      detail: 'Hasta 50,000 horas de vida útil',
    },
    {
      title: 'Calidad Garantizada',
      description:
        'Todos nuestros productos cuentan con garantía extendida y certificaciones internacionales de los más altos estándares.',
      detail: '5 años de garantía premium',
    },
    {
      title: 'Asesoramiento Personalizado',
      description:
        'Nuestro equipo de expertos te acompaña en cada proyecto, desde la consulta inicial hasta la instalación final.',
      detail: 'Soporte técnico 24/7',
    },
    {
      title: 'Cobertura Nacional',
      description:
        'Contamos con una amplia red de distribuidores en todo el país para abastecer de forma rápida y eficiente a nuestros clientes.',
      detail: 'Red logística en todo el país',
    },
    {
      title: 'Diseño Exclusivo',
      description:
        'Luminarias con diseños únicos que combinan funcionalidad y estética premium para crear ambientes únicos.',
      detail: 'Más de 200 diseños exclusivos',
    },
    {
      title: 'Eficiencia Energética',
      description:
        'Reduce hasta un 80% tu consumo eléctrico con nuestras soluciones LED de última generación y tecnología smart.',
      detail: 'Ahorro promedio de $15k/mes',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative px-[var(--padding-generico-x-y)] py-20">
        {/* Header moderno */}
        <div className="text-center mb-16">
          <h2 className="font-bold bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent mb-4 titulo-1">
            Por qué somos tu mejor elección
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto opacity-70 text-home">
            Más de una década liderando la revolución de la iluminación LED
          </p>
        </div>

        {/* Grid moderno sin cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {ventajas.map((ventaja, index) => (
            <div
              key={index}
              className="group relative cursor-pointer transition-transform duration-500 hover:scale-105"
            >
              {/* Contenido principal */}
              <div className="relative z-10 p-8">
                {/* Título */}
                <h3
                  className="font-bold mb-4 group-hover:text-red-600 transition-colors duration-300 titulo"
                  style={{
                    fontSize: 'var(--text-medios)',
                    fontFamily: 'var(--tipo-fuente)',
                    color: 'var(--color-fuente-black)',
                  }}
                >
                  {ventaja.title}
                </h3>

                {/* Descripción */}
                <p className="mb-4 leading-relaxed group-hover:opacity-80 transition-opacity duration-300 text-home-2">
                  {ventaja.description}
                </p>

                {/* Detalle destacado */}
                <div className="relative overflow-hidden">
                  <div className="transform transition-transform duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-medium">
                      {ventaja.detail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Efecto de background hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-transparent rounded-2xl transform transition-transform duration-500 scale-95 opacity-0 shadow-none group-hover:scale-105 group-hover:opacity-100 group-hover:shadow-2xl -z-10"></div>

              {/* Línea decorativa */}
              <div className="absolute left-0 top-0 w-1 bg-gradient-to-b from-red-500 to-red-600 transition-all duration-300 h-0 group-hover:h-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
