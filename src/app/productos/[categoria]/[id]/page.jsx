'use client';

import { useEffect, useState } from 'react';
import Measure from '@/app/productos/[categoria]/[id]/measure';
import LoaderP from '@/components/loader/loagerP';
import '../../productosSection.css';
import { IMG_URL } from '@/utils/constants';
import { usePathname } from 'next/navigation';

export default function page({ params }) {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [product, setProduct] = useState('');
  const [categoria, setcategoria] = useState('');
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const { id } = params;

  useEffect(() => {
    const asl = async () => {
      const res = await fetch(`/api/product?id=${id}`);
      const data1 = await res.json();
      if (data1.product) {
        const productReceived = data1.product;
        setProduct(productReceived);
        setcategoria(productReceived.categoria);
      } else {
        console.log('No se encontró el producto');
      }
    };
    asl();
  }, [id]);

  const handleModelChange = (index) => {
    setSelectedModelIndex(index);
  };
  return (
    <>
      {product ? (
        <div className="p-6 md:p-10 flex gap-10 flex-col container-producto ">
          <section className="flex flex-wrap gap-10 padding-container-top">
            <div className="flex-1 min-w-72 flex flex-col">
              <h3 className="h2-page-product">{product.nombre}</h3>
              <p className="p-text-product-description">
                {product.descripcion}
              </p>
            </div>
            <div className="flex-1 min-w-72 relative aspect-square rounded-lg overflow-hidden">
              <img
                fill
                src={`${IMG_URL}/${product.modelos[0].id}.png`}
                alt={product.code}
                className="object-cover"
              />
            </div>
          </section>

          <div className="flex gap-4 justify-center container-button-responsive">
            {product.modelos.map((modelo, index) => {
              const subnombreSinColgante = modelo.subnombre.replace(
                'Colgante ',
                '',
              );
              return (
                <button
                  key={modelo.id}
                  onClick={() => handleModelChange(index)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedModelIndex === index
                      ? 'selected-button'
                      : 'button-extra'
                  } transition-colors`}
                >
                  {subnombreSinColgante}
                </button>
              );
            })}
          </div>
          {product.modelos[selectedModelIndex] && (
            <section>
              <section className="h-96 w-full relative container-img-product-id bg-white">
                <img
                  fill
                  src={`https://images.smartcloudstudio.com/gsg/fotos_blanco/${categoria.toLowerCase()}/${
                    product.modelos[selectedModelIndex].fotos_producto
                  }`}
                  alt={product.modelos[selectedModelIndex].fotos_producto}
                  className="img-page-pruct "
                />
              </section>
              <section className="flex flex-contain">
                <h3 className="h2-page-product">Caracteristicas</h3>
              </section>
              <div className="flex gap-4 flex-col">
                <h2 className=" p-text-product  text-p">Descripcion tecnica</h2>
                <Measure
                  product={{
                    ...product,
                    productCharacteristics:
                      product.modelos[selectedModelIndex]
                        .caracteristicasTecnicas,
                  }}
                />
              </div>
            </section>
          )}
        </div>
      ) : (
        <LoaderP />
      )}
    </>
  );
}
