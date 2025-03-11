'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './navStyle.css';

const rutas = [
  { id: 1, nombre: 'HOME', deruta: '/' },
  { id: 2, nombre: 'PRODUCTOS', deruta: '/productos' },
  { id: 2, nombre: 'ACCESORIOS', deruta: '/accesorios' },
  { id: 2, nombre: 'LED', deruta: '/led' },
  { id: 3, nombre: 'DISTRIBUIDORES', deruta: '/distribuidores' },
  { id: 4, nombre: 'NOSOTROS', deruta: '/nosotros' },
  { id: 5, nombre: 'CONTACTO', deruta: '/contacto' },
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
