export const NoResults = ({ onReset }) => (
  <div className="w-full text-center py-20">
    <p className="text-xl text-gray-500 mb-4">No se encontraron productos</p>
    <button
      onClick={onReset}
      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
    >
      Limpiar filtros
    </button>
  </div>
);
