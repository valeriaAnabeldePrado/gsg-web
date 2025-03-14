'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './productosSection.css';
import LoaderP from '@/components/loader/loagerP';
import FooterM from '@/components/footer/footer';

const ProductosContent = () => {
  const searchParams = useSearchParams(); // Esto debe estar en un Suspense
  let categoria;
  if (searchParams.get('categoria')) {
    console.log(searchParams.get('categoria'));
    categoria = searchParams.get('categoria').toLowerCase();
  }

  return (
    <Suspense fallback={<LoaderP />}>
      <ProductosList categoria={categoria} />
    </Suspense>
  );
};

const ProductosList = ({ categoria }) => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaderOk, setloaderOk] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products`);
      const data1 = await res.json();
      const data = data1.products;
      setOriginalProducts(data);
      setloaderOk(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoria === 'todos' || !categoria) {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter(
        (product) => product.categoria.toLowerCase() === categoria,
      );

      setProducts(filteredProducts);
    }
  }, [categoria, originalProducts]);

  return (
    <div className="w-full wrapper-cont">
      <section className="flex items-center justify-between flex-wrap w-full responsive-container">
        {originalProducts && !loaderOk ? (
          products.map((el, i) =>
            el.modelos.map((modelo, j) =>
              modelo.foto_portada ? (
                <div
                  key={`${i}_${j}_${modelo.id}`}
                  className="container-itemss group transform transition-transform duration-300 group-hover:scale-100 rounded-3xl"
                >
                  <Link href={`/productos/${el.categoria}/${el._id}`}>
                    <div className="relative container-img-gg transform transition-transform duration-300 group-hover:scale-100 rounded-3xl">
                      <Image
                        key={modelo.id}
                        src={`${modelo.foto_portada}`}
                        alt={modelo.subnombre}
                        fill
                        className="img-class rounded-3xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="mask rounded-3xl"></div>
                      <h2 className="title-gallery">{modelo.subnombre}</h2>
                    </div>
                  </Link>
                </div>
              ) : null,
            ),
          )
        ) : (
          <LoaderP />
        )}
      </section>
    </div>
  );
};

const Productos = () => {
  return (
    <Suspense fallback={<LoaderP />}>
      <ProductosContent />
      <FooterM />
    </Suspense>
  );
};

export default Productos;
