'use client';
import React from 'react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import logoDownload from '../../../public/imagenes/flecha.svg';
import './catalogoSection.css';
import { useGSAP } from '@gsap/react';
import ButtonL from '../buttons/buttonL';
import CategoryList from '../categoryList-home/categoryList';

const CatalogoHome = () => {
  const blackRef = useRef(null);
  useGSAP(() => {
    gsap.to('.main-bg-black', {
      backgroundColor: '#170c01',
      color: '#fff',
      scrollTrigger: {
        trigger: blackRef.current,
        start: 'top center',
        end: 'center 60% ',
        pinSpacer: false,
        scrub: 0.5,
      },
    });
  }, [blackRef]);
  return (
    <>
      <div className="main-bg-black ">
        <CategoryList />
        <div className="cont-black flex w-full justify-center items-center py-10 ">
          <section
            className="flex flex-col items-center text-center"
            ref={blackRef}
          >
            <h2 className="h2-catalogo mb-6">
              Descarga nuestro catálogo de productos
            </h2>
            <section className="flex flex-col items-center justify-center">
              <div className="contImg-logo mb-4">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <Image
                    src={logoDownload}
                    fill
                    priority={true}
                    alt="logoD"
                    className="logoDownload"
                  />
                </div>
              </div>
              <div className="cont-btn-descarga">
                <ButtonL />
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default CatalogoHome;
