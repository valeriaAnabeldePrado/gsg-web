import React from 'react';

const colorMap = {
  Alumin: '#d4d4d4',
  Negro: '#000000',
  Blanco: '#ffffff',
  bronce: '#cda434',
  cromo: 'a4a098',
  Cromo: 'a4a098',
  Champagne: '#f7e7ce',
  'champagne anodizado': '#D7C7A7,',
  Oro: '#ffd700',
  'Aluminio mate': '#c0c0c0',
  'Aluminio brillante': '#e6e6e6',
  'Blanco micro': '#f8f8ff',
  'Negro micro': '#000000',
  'acero inoxidable': '#b0c4de',
  'Oro mate': '#ffd200',
};

const colorOptions = ['Todos', ...Object.keys(colorMap)];
const acabadoOptions = ['Todos', 'Mate', 'Brillante', 'Satinado'];

const Filtering = ({ filters, onChange }) => {
  // Función única para manejar todos los cambios
  const handleChange = (field, value) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  // Estilos comunes para inputs
  const inputStyles =
    'rounded-xl bg-white py-2 px-4 text-sm font-medium text-gray-700 border-2 border-gray-300 shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none hover:border-red-300';

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-50 rounded-lg">
      {/* Color */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-600 min-w-[60px]">
          Acabado:
        </label>
        <select
          className={`${inputStyles} w-32`}
          value={filters.acabado}
          onChange={(e) => handleChange('acabado', e.target.value)}
        >
          {colorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Cantidad de leds */}

      {/* Incluye equipo */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="incluyeEquipo"
          checked={filters.incluyeEquipo}
          onChange={(e) => handleChange('incluyeEquipo', e.target.checked)}
          className="accent-red-500 w-4 h-4"
        />
        <label
          htmlFor="incluyeEquipo"
          className="text-sm font-semibold text-gray-600 cursor-pointer"
        >
          Incluye equipo
        </label>
      </div>

      {/* Botón para limpiar filtros */}
      <button
        onClick={() =>
          onChange({
            categoria: 'Todos',
            color: 'Todos',
            acabado: 'Todos',
            wattMin: '',
            wattMax: '',
            incluyeEquipo: false,
          })
        }
        className="ml-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default Filtering;
