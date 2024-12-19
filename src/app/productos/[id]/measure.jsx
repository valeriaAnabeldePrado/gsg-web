"use client";
import "../productosSection.css";
export default function Measure({ product }) {
  const descripcionTecnica = product.caracteristicasTecnicas;

  return (
    <>
      {descripcionTecnica ? (
        <div className="flex gap-8 flex-wrap justify-between">
          <div>
            <h2 className="title-ficha">Lumen</h2>
            {descripcionTecnica.lumen &&
              descripcionTecnica.lumen.map((el, i) => {
                return (
                  <p className="pt-10" key={`${el}_${i}`}>
                    {el}
                  </p>
                );
              })}
          </div>

          <div>
            <h2 className="title-ficha">Acabado</h2>
            {descripcionTecnica.acabado &&
              descripcionTecnica.acabado.map((el, i) => {
                // Mapeo de nombres a colores
                const colorMap = {
                  "Aluminio anodizado": "#d4d4d4", // Gris claro
                  "Alumino anodizado": "#d4d4d4", // Gris claro
                  Negro: "#000000", // Negro
                  "Negro mate": "#1a1a1a", // Negro mate
                  Blanco: "#ffffff", // Blanco
                  "Blanco Semi-mate": "#f5f5f5", // Blanco semi mate
                  "Blanco microtexturado": "#fafafa", // Blanco texturizado
                  Champagne: "#f7e7ce", // Color champagne
                  Oro: "#ffd700", // Dorado
                  "Aluminio mate": "#c0c0c0", // Aluminio mate
                  "Aluminio brillante": "#e6e6e6", // Aluminio brillante
                  "Blanco micro": "#f8f8ff", // Blanco micro
                  "Negro micro": "#2e2e2e", // Negro micro
                  "acero inoxidable": "#b0c4de", // Acero inoxidable
                };

                // Determina el color según el nombre
                const color = colorMap[el.trim()] || "black"; // Gris por defecto si no está definido

                return (
                  <div
                    key={`${el}_${i}`}
                    className="flex items-center gap-2 pt-10"
                  >
                    {/* Renderiza un círculo con el color */}
                    <span
                      className="inline-block w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                    ></span>
                    <p>{el.trim()}</p> {/* También muestra el nombre */}
                  </div>
                );
              })}
          </div>
          <div>
            <h2 className="title-ficha">Largo </h2>
            {descripcionTecnica.largo &&
              descripcionTecnica.largo.map((el, i) => {
                return (
                  <p className="pt-10" key={`${el}_${i}`}>
                    {el} cm
                  </p>
                );
              })}
          </div>
          <div>
            <h2 className="title-ficha">Ancho </h2>
            {descripcionTecnica.ancho &&
              descripcionTecnica.ancho.map((el, i) => {
                return (
                  <p className="pt-10" key={`${el}_${i}`}>
                    {el} cm
                  </p>
                );
              })}
          </div>
          <div>
            <h2 className="title-ficha">Diametro </h2>
            {descripcionTecnica.diametro
              ? descripcionTecnica.diametro.map((el, i) => {
                  return (
                    <p className="pt-10" key={`${el}_${i}`}>
                      {el} cm
                    </p>
                  );
                })
              : "No corresponde"}
          </div>
          <div>
            <h2 className="title-ficha">Tono </h2>
            {descripcionTecnica.tono &&
              descripcionTecnica.tono.map((el, i) => {
                return (
                  <p className="pt-10" key={`${el}_${i}`}>
                    {el}
                  </p>
                );
              })}
          </div>
          <div>
            <h2 className="title-ficha">Watt </h2>
            {descripcionTecnica.watt &&
              descripcionTecnica.watt.map((el, i) => {
                return (
                  <p className="pt-10" key={`${el}_${i}`}>
                    {el}
                  </p>
                );
              })}
          </div>
          <div>
            <p className="title-ficha">
              Led Incluido: {descripcionTecnica.incluyeLed ? "SI" : "NO"}
            </p>
            <p className="title-ficha">
              Incluiye Equipo: {descripcionTecnica.incluyeEquipo ? "SI" : "NO"}
            </p>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
}
