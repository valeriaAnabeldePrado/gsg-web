'use client';
import '../../productosSection.css';
export default function Measure({ product }) {
  let CharacteristicsP = product.productCharacteristics;

  return (
    <>
      {CharacteristicsP ? (
        <div>
          <div className="container-characteristics">
            <div>
              <h2 className="title-measure">Lumen</h2>
              <div className="container-measure-responsive">
                {CharacteristicsP.lumen?.map((el, i) => (
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
              {Array.isArray(CharacteristicsP.largo) &&
                CharacteristicsP.largo.length > 0 && (
                  <>
                    <h2 className="title-measure">Largo </h2>
                    <div className="container-measure-responsive">
                      {CharacteristicsP.largo.map((el, i) => (
                        <p
                          className="pt-10 max-[800px]:pt-4 text-mg font-light"
                          key={`${el}_${i}`}
                        >
                          {el} cm
                        </p>
                      ))}
                    </div>
                  </>
                )}
            </div>

            <div>
              {CharacteristicsP.ancho && (
                <>
                  <h2 className="title-measure">Ancho </h2>
                  <div className="container-measure-responsive">
                    {CharacteristicsP.ancho.map((el, i) => (
                      <p
                        className="pt-10 max-[800px]:pt-4 text-mg font-light"
                        key={`${el}_${i}`}
                      >
                        {el} cm
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              {Array.isArray(CharacteristicsP.diametro) &&
                CharacteristicsP.diametro.length > 0 && (
                  <>
                    <h2 className="title-measure">Diametro </h2>
                    <div className="container-measure-responsive">
                      {CharacteristicsP.diametro.map((el, i) => (
                        <p
                          className="pt-10 max-[800px]:pt-4 text-mg font-light"
                          key={`${el}_${i}`}
                        >
                          {el} cm
                        </p>
                      ))}
                    </div>
                  </>
                )}
            </div>

            <div>
              <h2 className="title-measure">Tono </h2>
              <div className="container-measure-responsive">
                {CharacteristicsP.tono?.map((el, i) => (
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
                {CharacteristicsP.watt?.map((el, i) => (
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
                Led Incluido: {CharacteristicsP.incluyeLed ? 'sí' : 'no'}
              </p>
              <p className="title-measure">
                Incluye Fuente: {CharacteristicsP.incluyeEquipo ? 'sí' : 'no'}
              </p>
            </div>
          </div>

          {/* Sección de Acabado mejorada */}
          <div>
            <h2 className="title-measure">Acabado</h2>
            <div className="container-acabado">
              {CharacteristicsP.acabado?.map((el, i) => {
                const colorMap = {
                  'Aluminio anodizado': '#d4d4d4',
                  'Alumino anodizado': '#d4d4d4',
                  Negro: '#000000',
                  'Negro anodizado': '#222222',
                  'Negro mate': '#1a1a1a',
                  Blanco: '#ffffff',
                  'Blanco Semi-mate': '#f5f5f5',
                  'Blanco microtexturado': '#fafafa',
                  Champagne: '#f7e7ce',
                  'champagne anodizado': '#D7C7A7,',
                  Oro: '#ffd700',
                  'Aluminio mate': '#c0c0c0',
                  'Aluminio brillante': '#e6e6e6',
                  'Blanco micro': '#f8f8ff',
                  'Negro micro': '#2e2e2e',
                  'acero inoxidable': '#b0c4de',
                  'Oro mate': '#ffd200',
                };
                const color = colorMap[el.trim()] || '#888888';

                return (
                  <div key={`${el}_${i}`} className="acabado-item">
                    <span
                      className="acabado-color"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span className="text-mg font-light">{el.trim()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  );
}
