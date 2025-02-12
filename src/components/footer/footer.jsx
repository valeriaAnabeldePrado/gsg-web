'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import './footerStyle.css';

const FooterM = () => {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHome(window.location.pathname === '/');
    }
  }, []);

  return (
    <>
      <footer className={`container-footer ${isHome ? 'bg-[#170c01]' : ''}`}>
        <div>
          <section className="cont-h2-footer">
            <h2 className={`h2-footer ${isHome ? 'text-white' : 'text-black'}`}>
              We are light
            </h2>
          </section>
          <img
            src="\imagenes\logo-red.svg"
            alt="logo"
            className="h-[20vh] ml-4 mt-4"
          />
          <button className="footer-button">
            <Link
              href={'/contacto'}
              className={`text-3xl font-extralight flex items-center ${isHome ? 'text-white' : 'text-black'}`}
            >
              Contactáte
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </button>
        </div>

        <div className="cont-text-otros oficinas">
          <h3>Nuestras oficinas</h3>
          <p className={`${isHome ? 'text-white' : 'text-black'}`}>
            Direccion de oficina
          </p>
          <p className={`${isHome ? 'text-white' : 'text-black'}`}>
            Direccion de oficina
          </p>
          <p className={`${isHome ? 'text-white' : 'text-black'}`}>
            Direccion de oficina
          </p>
        </div>
      </footer>
      <div className="w-full flex justify-around p-5">
        <Link href={'#'}>
          <img src="\imagenes\face-logo.png" className="h-[5vh]" />
        </Link>
        <Link href={'#'}>
          <img src="\imagenes\ig-logo.png" className="h-[5vh]" />
        </Link>
      </div>
    </>
  );
};

export default FooterM;
