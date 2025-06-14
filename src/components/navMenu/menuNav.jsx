'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './navStyle.css';
import Image from 'next/image';
import logo from '/public/imagenes/logo-red.svg';

const rutas = [
  { id: 1, nombre: 'HOME', deruta: '/' },
  { id: 2, nombre: 'PRODUCTOS', deruta: '/productos' },
  { id: 3, nombre: 'ACCESORIOS', deruta: '/accesorios' },
  { id: 4, nombre: 'LED', deruta: '/led' },
  { id: 5, nombre: 'DISTRIBUIDORES', deruta: '/distribuidores' },
  { id: 6, nombre: 'NOSOTROS', deruta: '/nosotros' },
  { id: 7, nombre: 'CONTACTO', deruta: '/contacto' },
];

const MenuNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="cont-nav ">
        <nav className="menu-nav ">
          <ul className="p-2">
            <Image src={logo} height={60} width="auto" alt="logo" />
          </ul>
          <ul className="nav-list">
            {rutas.map((ruta) => (
              <li key={ruta.id} className="nav-item">
                <Link href={ruta.deruta} className="nav-link">
                  {ruta.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* menu burger */}
      <section className="nav-bar-position">
        <div
          className={`burger ${isNavOpen ? 'burger-open' : ''}`}
          onClick={handleClick}
        >
          <div className="fas fas-x"></div>
          <div className="fas fas-x"></div>
          <div className="fas fas-x"></div>
        </div>

        <nav className={`navbar ${isNavOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links">
            {rutas.map((ruta) => (
              <li
                key={ruta.id}
                className={`nav-link ${isNavOpen ? 'nav-link-open' : ''}`}
              >
                <Link href={ruta.deruta} onClick={handleClick}>
                  {ruta.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default MenuNav;
