'use client';
import '../accSection.css';
export default function Measure({ product }) {
  let CharacteristicsP = product.caracteristicasTecnicas;

  return (
    <>
      {CharacteristicsP ? (
        <div className="container-characteristics">
          <div>
            <h2 className="title-measure">Acabado</h2>
            <div className="container-measure-responsive">
              {Array.isArray(CharacteristicsP.acabado) &&
                CharacteristicsP.acabado &&
                CharacteristicsP.acabado.map((el, i) => {
                  const colorMap = {
                    'Aluminio anodizado': '#d4d4d4', // Gris claro
                    'Alumino anodizado': '#d4d4d4', // Gris claro
                    Negro: '#000000', // Negro
                    'Negro mate': '#1a1a1a', // Negro mate
                    Blanco: '#ffffff', // Blanco
                    'Blanco Semi-mate': '#f5f5f5', // Blanco semi mate
                    'Blanco microtexturado': '#fafafa', // Blanco texturizado
                    Champagne: '#f7e7ce', // Color champagne
                    Oro: '#ffd700', // Dorado
                    'Aluminio mate': '#c0c0c0', // Aluminio mate
                    'Aluminio brillante': '#e6e6e6', // Aluminio brillante
                    'Blanco micro': '#f8f8ff', // Blanco micro
                    'Negro micro': '#2e2e2e', // Negro micro
                    'acero inoxidable': '#b0c4de', // Acero inoxidable
                    'Oro mate': '#ffd200',
                  };

                  // Determina el color según el nombre
                  const color = colorMap[el.trim()] || 'black'; // Gris por defecto si no está definido

                  return (
                    <div
                      key={`${el}_${i}`}
                      className="flex items-center gap-2 pt-10"
                    >
                      <span
                        className="inline-block w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color }}
                      ></span>
                      <p className="text-mg font-light max-[800px]:hidden">
                        {el.trim()}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <h2 className="title-measure">Tono </h2>
            <div className="container-measure-responsive">
              {Array.isArray(CharacteristicsP.tono) &&
                CharacteristicsP.tono &&
                CharacteristicsP.tono.map((el, i) => {
                  return (
                    <p
                      className="pt-10 max-[800px]:pt-4 text-mg font-light"
                      key={`${el}_${i}`}
                    >
                      {el}
                    </p>
                  );
                })}
            </div>
          </div>
          <div>
            <h2 className="title-measure">Watt </h2>
            <div className="container-measure-responsive">
              {Array.isArray(CharacteristicsP.watt) &&
                CharacteristicsP.watt.length > 0 &&
                CharacteristicsP.watt.map((el, i) => (
                  <p
                    className="pt-10 max-[800px]:pt-4 text-mg font-light"
                    key={`${el}_${i}`}
                  >
                    {el}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <h2 className="title-measure">Watt </h2>
            <div className="container-measure-responsive">
              {Array.isArray(CharacteristicsP.volt) &&
                CharacteristicsP.volt.length > 0 &&
                CharacteristicsP.volt.map((el, i) => (
                  <p
                    className="pt-10 max-[800px]:pt-4 text-mg font-light"
                    key={`${el}_${i}`}
                  >
                    {el}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <p className="title-measure">
              Led Incluido: {CharacteristicsP.incluyeLed ? 'si' : 'no'}
            </p>
            <p className="title-measure">
              Incluiye Equipo: {CharacteristicsP.incluyeEquipo ? 'si' : 'no'}
            </p>
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  );
}
