'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './navStyle.css';
import Image from 'next/image';
import logo from '/public/imagenes/logo-red.svg';
import { productTitle } from '@/utils/constants';

const rutas = [
  { id: 1, nombre: 'HOME', deruta: '/' },
  { id: 2, nombre: 'PRODUCTOS', deruta: '/productos', hasDropdown: true },
  { id: 3, nombre: 'ACCESORIOS', deruta: '/accesorios' },
  { id: 4, nombre: 'LED', deruta: '/led' },
  { id: 5, nombre: 'DISTRIBUIDORES', deruta: '/distribuidores' },
  { id: 6, nombre: 'NOSOTROS', deruta: '/nosotros' },
  { id: 7, nombre: 'CONTACTO', deruta: '/contacto' },
];

const MenuNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
    // Cerrar dropdowns cuando se abre/cierra el menú
    if (isProductDropdownOpen) {
      setIsProductDropdownOpen(false);
    }
    if (isMobileDropdownOpen) {
      setIsMobileDropdownOpen(false);
    }
  };

  const handleProductDropdownToggle = (e) => {
    e.stopPropagation();
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const handleMobileDropdownToggle = (e) => {
    e.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
    console.log(isMobileDropdownOpen);
  };

  const handleCategoryClick = (categoria) => {
    setIsProductDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    setIsNavOpen(false);
  };

  // Cerrar dropdown desktop cuando se haga clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar dropdown móvil cuando se haga clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileDropdownOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isNavOpen]);

  // Limpiar dropdowns cuando se cierra el menú móvil
  useEffect(() => {
    if (!isNavOpen) {
      setIsProductDropdownOpen(false);
      setIsMobileDropdownOpen(false);
    }
  }, [isNavOpen]);

  return (
    <>
      {/* menu escritorio */}
      <div className="cont-nav ">
        <nav className="menu-nav ">
          <ul className="p-2">
            <Image src={logo} height={60} width="auto" alt="logo" />
          </ul>
          <ul className="nav-list">
            {rutas.map((ruta) => (
              <li key={ruta.id} className="nav-item">
                {ruta.hasDropdown ? (
                  <div className="dropdown-container" ref={dropdownRef}>
                    <button
                      className="nav-link dropdown-toggle"
                      onClick={handleProductDropdownToggle}
                    >
                      {ruta.nombre}
                      <span
                        className={`dropdown-arrow ${isProductDropdownOpen ? 'rotated' : ' originalAngle'}`}
                      >
                        ▼
                      </span>
                    </button>
                    {isProductDropdownOpen && (
                      <div className="dropdown-menu">
                        {productTitle.map((categoria, index) => (
                          <Link
                            key={index}
                            href={`/productos?categoria=${categoria}`}
                            className="dropdown-item"
                            onClick={() => handleCategoryClick(categoria)}
                          >
                            {categoria}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={ruta.deruta} className="nav-link">
                    {ruta.nombre}
                  </Link>
                )}
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
            {rutas.map((ruta, index) => (
              <li
                key={ruta.id}
                className={`nav-link ${isNavOpen ? 'nav-link-open' : ''} ${
                  isMobileDropdownOpen && index >= 2 ? 'dropdown-open' : ''
                }`}
              >
                {ruta.hasDropdown ? (
                  <div className="mobile-dropdown" ref={mobileDropdownRef}>
                    <button
                      className="mobile-dropdown-toggle"
                      onClick={handleMobileDropdownToggle}
                    >
                      {ruta.nombre}
                      <span
                        className={`mobile-dropdown-arrow ${isMobileDropdownOpen ? 'rotated' : ' originalAngle'}`}
                      >
                        ▼
                      </span>
                    </button>
                    <div
                      className={`mobile-dropdown-menu ${isMobileDropdownOpen ? 'open' : ''}`}
                    >
                      {productTitle.map((categoria, index) => (
                        <Link
                          key={index}
                          href={`/productos?categoria=${categoria}`}
                          className="mobile-dropdown-item"
                          onClick={() => handleCategoryClick(categoria)}
                        >
                          {categoria}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={ruta.deruta} onClick={handleClick}>
                    {ruta.nombre}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default MenuNav;
