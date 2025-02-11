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
      <div className="main-bg-black">
        <CategoryList />
        <div className="h-auto cont-black">
          <section className="cont-catalogo" ref={blackRef}>
            <div className="cont-h2-arrow">
              <h2 className="h2-catalogo">
                Descarga nuestro catálogo de productos
              </h2>
              <section className="flex h-full flex-col items-center gap-10 mt-32 justify-center ">
                <div className=" contImg-logo">
                  <Image
                    src={logoDownload}
                    fill
                    priority={true}
                    alt="logoD"
                    className="logoDownloag"
                  />
                </div>
                <div className="cont-btn-descarga">
                  <ButtonL></ButtonL>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CatalogoHome;
