'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navStyle.css';
import Image from 'next/image';
import logo from '/public/imagenes/logo-red.svg';
import { productTitle } from '@/utils/constants';

const rutas = [
  { id: 1, nombre: 'HOME', deruta: '/' },
  { id: 2, nombre: 'PRODUCTOS', deruta: '/productos', hasDropdown: true },
  { id: 5, nombre: 'DISTRIBUIDORES', deruta: '/distribuidores' },
  { id: 6, nombre: 'NOSOTROS', deruta: '/nosotros' },
  { id: 7, nombre: 'CONTACTO', deruta: '/contacto' },
];

const MenuNav = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/home';

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
    if (isProductDropdownOpen) setIsProductDropdownOpen(false);
    if (isMobileDropdownOpen) setIsMobileDropdownOpen(false);
  };

  const handleProductDropdownToggle = (e) => {
    e.stopPropagation();
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const handleMobileDropdownToggle = (e) => {
    e.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleCategoryClick = () => {
    setIsProductDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    setIsNavOpen(false);
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll detection
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset dropdowns when nav closes
  useEffect(() => {
    if (!isNavOpen) {
      setIsProductDropdownOpen(false);
      setIsMobileDropdownOpen(false);
    }
  }, [isNavOpen]);

  return (
    <>
      {/* Desktop Menu */}
      <div
        className={`cont-nav ${isScrolled ? 'scrolled' : ''} ${!isHomePage ? 'not-home' : ''}`}
      >
        <nav className="menu-nav">
          <ul className="p-2">
            <Link href="/">
              <Image src={logo} height={60} width="auto" alt="logo" priority />
            </Link>
          </ul>
          <ul className="nav-list">
            {rutas.map((ruta) => (
              <li key={ruta.id} className="nav-item">
                {ruta.hasDropdown ? (
                  <div className="dropdown-container" ref={dropdownRef}>
                    <button
                      className="nav-link dropdown-toggle"
                      onClick={handleProductDropdownToggle}
                      onMouseEnter={() => setIsProductDropdownOpen(true)}
                    >
                      {ruta.nombre}
                      <span
                        className={`dropdown-arrow ${isProductDropdownOpen ? 'rotated' : ''}`}
                      >
                        ▼
                      </span>
                    </button>

                    {/* DROPDOWN MODERNO */}
                    <div
                      className={`modern-dropdown ${isProductDropdownOpen ? 'visible' : ''}`}
                      onMouseLeave={() => setIsProductDropdownOpen(false)}
                    >
                      <div className="dropdown-inner">
                        {/* Luminarias en lista horizontal */}
                        <div className="dropdown-section">
                          <span className="section-label">Luminarias</span>
                          <div className="links-row">
                            {productTitle.map((categoria, index) => (
                              <Link
                                key={index}
                                href={`/productos?categoria=${categoria}`}
                                className={`dropdown-link ${categoria === 'Perfiles' ? 'special' : ''}`}
                                onClick={handleCategoryClick}
                              >
                                {categoria}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="dropdown-divider"></div>

                        {/* Especialidades */}
                        <div className="dropdown-section">
                          <span className="section-label">Especialidades</span>
                          <div className="links-row">
                            <Link
                              href="/led"
                              className="dropdown-link"
                              onClick={handleCategoryClick}
                            >
                              LED
                            </Link>
                            <Link
                              href="/accesorios"
                              className="dropdown-link"
                              onClick={handleCategoryClick}
                            >
                              Accesorios
                            </Link>
                            <Link
                              href="/productos"
                              className="dropdown-link highlight"
                              onClick={handleCategoryClick}
                            >
                              Ver todo →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
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

      {/* Mobile Menu (Burger) */}
      <section className="nav-bar-position">
        <div
          className={`burger ${isNavOpen ? 'burger-open' : ''} ${!isHomePage ? 'burger-dark' : ''}`}
          onClick={handleClick}
        >
          <div className="fas"></div>
          <div className="fas"></div>
          <div className="fas"></div>
        </div>

        <nav className={`navbar ${isNavOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links">
            {rutas.map((ruta, index) => (
              <li
                key={ruta.id}
                className={`nav-link ${isNavOpen ? 'nav-link-open' : ''}`}
              >
                {ruta.hasDropdown ? (
                  <div className="mobile-dropdown" ref={mobileDropdownRef}>
                    <button
                      className="mobile-dropdown-toggle"
                      onClick={handleMobileDropdownToggle}
                    >
                      {ruta.nombre}
                      <span
                        className={`mobile-dropdown-arrow ${isMobileDropdownOpen ? 'rotated' : ''}`}
                      >
                        ▼
                      </span>
                    </button>
                    <div
                      className={`mobile-dropdown-menu ${isMobileDropdownOpen ? 'open' : ''}`}
                    >
                      <div className="mobile-section-title">Luminarias</div>
                      <Link
                        href="/productos"
                        className="mobile-dropdown-item highlight"
                        onClick={handleCategoryClick}
                      >
                        Ver todo
                      </Link>
                      {productTitle.map((categoria, idx) => (
                        <Link
                          key={idx}
                          href={`/productos?categoria=${categoria}`}
                          className={`mobile-dropdown-item ${categoria === 'Perfiles' ? 'perfiles-item' : ''}`}
                          onClick={handleCategoryClick}
                        >
                          {categoria}
                        </Link>
                      ))}

                      <div className="mobile-divider"></div>
                      <Link
                        href="/led"
                        className="mobile-dropdown-item highlight"
                        onClick={handleCategoryClick}
                      >
                        Tecnología LED
                      </Link>
                      <Link
                        href="/accesorios"
                        className="mobile-dropdown-item highlight"
                        onClick={handleCategoryClick}
                      >
                        Accesorios
                      </Link>
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
