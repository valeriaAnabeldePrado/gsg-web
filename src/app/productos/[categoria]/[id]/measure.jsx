'use client';
import '../../productosSection.css';

export default function Measure({ product }) {
  const CharacteristicsP = product?.productCharacteristics;

  // Función para renderizar características con array
  const renderCharacteristic = (title, data, unit = '') => {
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    const values = Array.isArray(data) ? data : [data];

    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          {title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {values.map((value, i) => (
            <span
              key={`${value}_${i}`}
              className="inline-block bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-300"
            >
              {value}
              {unit}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Función para renderizar grupo de especificaciones técnicas
  const renderSpecGroup = () => {
    const hasSpecs =
      CharacteristicsP?.diametro ||
      CharacteristicsP?.largo ||
      CharacteristicsP?.ancho ||
      CharacteristicsP?.watt ||
      CharacteristicsP?.lumen;

    if (!hasSpecs) return null;

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Especificaciones Técnicas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderCharacteristic('Diámetro', CharacteristicsP.diametro, ' cm')}
          {renderCharacteristic('Largo', CharacteristicsP.largo, ' cm')}
          {renderCharacteristic('Ancho', CharacteristicsP.ancho, ' cm')}
          {renderCharacteristic('Potencia', CharacteristicsP.watt, 'W')}
          {renderCharacteristic('Lumen', CharacteristicsP.lumen, ' lm')}
        </div>
      </div>
    );
  };

  // Función para renderizar booleanos
  const renderBoolean = (title, value) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
        {title}
      </h4>
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          value
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}
      >
        {value ? '✓ Sí' : '✗ No'}
      </span>
    </div>
  );

  // Función para renderizar grupo de inclusiones
  const renderInclusionsGroup = () => {
    const hasInclusions =
      typeof CharacteristicsP?.incluyeLed === 'boolean' ||
      typeof CharacteristicsP?.incluyeEquipo === 'boolean';

    if (!hasInclusions) return null;

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Inclusiones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {typeof CharacteristicsP.incluyeLed === 'boolean' &&
            renderBoolean('LED Incluido', CharacteristicsP.incluyeLed)}
          {typeof CharacteristicsP.incluyeEquipo === 'boolean' &&
            renderBoolean('Incluye Fuente', CharacteristicsP.incluyeEquipo)}
        </div>
      </div>
    );
  };

  // Función para renderizar tonos de luz
  const renderTonosGroup = () => {
    if (!CharacteristicsP?.tono || CharacteristicsP.tono.length === 0)
      return null;

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Tonos de Luz
        </h3>
        <div className="flex flex-wrap gap-3">
          {CharacteristicsP.tono.map((tono, i) => (
            <span
              key={`${tono}_${i}`}
              className="inline-block bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium border border-yellow-200"
            >
              {tono}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Función para renderizar acabados con colores
  const renderAcabadoGroup = () => {
    if (!CharacteristicsP?.acabado || CharacteristicsP.acabado.length === 0)
      return null;

    const colorMap = {
      'Aluminio anodizado': '#d4d4d4',
      'Alumino anodizado': '#d4d4d4',
      Negro: '#000000',
      'Negro anodizado': '#000000',
      'Negro mate': '#000000',
      Blanco: '#ffffff',
      'Blanco Semi-mate': '#f5f5f5',
      'Blanco microtexturado': '#fafafa',
      bronce: '#cda434',
      Bronce: '#cda434',
      cromo: '#a4a098',
      Cromo: '#a4a098',
      Champagne: '#f7e7ce',
      'champagne anodizado': '#D7C7A7',
      Oro: '#ffd700',
      'Aluminio mate': '#c0c0c0',
      'Aluminio brillante': '#e6e6e6',
      'Blanco micro': '#f8f8ff',
      'Negro micro': '#000000',
      'acero inoxidable': '#b0c4de',
      'Oro mate': '#ffd200',
    };

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Acabados Disponibles
        </h3>
        <div className="flex flex-wrap gap-3">
          {CharacteristicsP.acabado.map((acabado, i) => {
            const color = colorMap[acabado.trim()] || '#888888';
            return (
              <div
                key={`${acabado}_${i}`}
                className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
              >
                <span
                  className="w-5 h-5 rounded-full border-2 border-gray-400 shadow-sm"
                  style={{ backgroundColor: color }}
                ></span>
                <span className="text-sm font-medium text-gray-700">
                  {acabado.trim()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!CharacteristicsP) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-gray-400 text-4xl mb-4">📋</div>
        <p className="text-gray-500 text-lg">
          No hay características técnicas disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grupo 1: Especificaciones Técnicas (Diámetro, Watt, Lumen) */}
      {renderSpecGroup()}

      {/* Grupo 2: Inclusiones (LED, Fuente) */}
      {renderInclusionsGroup()}

      {/* Grupo 3: Tonos de Luz */}
      {renderTonosGroup()}

      {/* Grupo 4: Acabados */}
      {renderAcabadoGroup()}
    </div>
  );
}
