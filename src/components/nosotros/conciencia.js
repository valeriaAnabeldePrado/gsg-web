import React from 'react';
import './nosotros.css';

function SustainabilityCircles() {
  const sustainabilityItems = [
    {
      icon: '♻️',
      title: 'Reducir',
      description:
        'Minimizamos el consumo de recursos en nuestros procesos de producción',
    },
    {
      icon: '🔄',
      title: 'Reutilizar',
      description:
        'Aprovechamos al máximo los materiales en diferentes aplicaciones',
    },
    {
      icon: '🌱',
      title: 'Reciclar',
      description:
        'Convertimos residuos en nuevos materiales para futuras producciones',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {sustainabilityItems.map((item, index) => (
        <div
          key={item.title}
          className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">{item.icon}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Decorative element */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
}

export default function Conciencia() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <span className="text-3xl">🌍</span>
          </div>
          <h2 className="h2-title-nos text-center mb-6">
            Conciencia ambiental
          </h2>
          <p className="text-nuestra max-w-3xl mx-auto text-gray-600">
            En GSG, estamos comprometidos con el medio ambiente. Implementamos
            prácticas sostenibles en todos nuestros procesos para minimizar
            nuestro impacto ambiental y contribuir a un futuro más verde.
          </p>
        </div>

        {/* Sustainability Circles */}
        <SustainabilityCircles />

        {/* Additional environmental commitment */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Nuestro Compromiso Verde
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Uso de materiales reciclables
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Optimización de energía en producción
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Reducción de residuos industriales
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Logística sostenible</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mb-4">
                <span className="text-4xl">🌿</span>
              </div>
              <p className="text-lg font-medium text-gray-700">
                Construyendo un futuro sostenible
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
