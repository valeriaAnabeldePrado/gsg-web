export const NoResults = () => (
  <div className="empty-state-container">
    <div className="empty-state-content">
      {/* Icono ilustrativo */}
      <div className="empty-state-icon">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5Z"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Título principal */}
      <h2 className="empty-state-title">No se encontraron los productos</h2>

      {/* Descripción */}
      <p className="empty-state-description">
        Intenta ajustar tu búsqueda o explorar otras categorías
      </p>

      {/* Elementos decorativos */}
      <div className="empty-state-decoration">
        <div className="decoration-dot"></div>
        <div className="decoration-dot"></div>
        <div className="decoration-dot"></div>
      </div>
    </div>
  </div>
);
