'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './footerStyle.css';
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import Pinterest from './Pinterest';
import FooterButon from '../buttons/footer-buton';

const FooterM = () => {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHome(window.location.pathname === '/');
    }
  }, []);

  const contactDetails = [
    {
      icon: <Phone size={18} />,
      label: 'Teléfono',
      value: '+54 11 5263 0462',
      href: 'tel:+541152630462',
    },
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: 'ventas@gsgdesign.com',
      href: 'mailto:ventas@gsgdesign.com',
    },
    {
      icon: <Clock size={18} />,
      label: 'Horario',
      value: 'Lunes a viernes · 9:00 a 18:00 hs',
    },
    {
      icon: <MapPin size={18} />,
      label: 'Ubicación',
      value: 'CABA, Argentina',
    },
  ];

  const navigationLinks = [
    { label: 'Productos', href: '/productos' },
    { label: 'LED', href: '/led' },
    { label: 'Accesorios', href: '/accesorios' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Distribuidores', href: '/distribuidores' },
    { label: 'Contacto', href: '/contacto' },
    { label: 'Catálogo digital', href: '/#catalogo' },
  ];

  const socialChannels = [
    {
      icon: <Instagram size={18} />,
      name: 'Instagram',
      link: 'https://www.instagram.com/gsgdesignsrl',
    },
    {
      icon: <Facebook size={18} />,
      name: 'Facebook',
      link: 'https://www.facebook.com/GSGled',
    },
    {
      icon: <Pinterest />,
      name: 'Pinterest',
      link: 'https://ar.pinterest.com/gsgdesignn',
    },
    {
      icon: <Youtube size={18} />,
      name: 'YouTube',
      link: 'https://www.youtube.com/@gsgdesign5903',
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`container-footer ${isHome ? 'footer--home' : ''}`}>
      <div className="footer-grid">
        <div className="footer-brand">
          <section className="cont-h2-footer">
            <h2 className="h2-footer">We are light</h2>
          </section>
          <div className="footer-brand-actions">
            <img
              src="/imagenes/logo-red.svg"
              alt="GSG Design Logo"
              className="footer-logo"
            />
            <FooterButon isHome={isHome} rute="contacto">
              Conectate
            </FooterButon>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-section-title">Contacto directo</h3>
          <ul className="footer-contact-list">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="footer-contact-item">
                <span className="footer-contact-icon">{detail.icon}</span>
                {detail.href ? (
                  <a href={detail.href} aria-label={detail.label}>
                    {detail.value}
                  </a>
                ) : (
                  <span>{detail.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-section-title">Accesos rápidos</h3>
          <ul className="footer-links-list">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-section-title">Síguenos</h3>
          <ul className="footer-social-list">
            {socialChannels.map((channel) => (
              <li key={channel.name}>
                <Link
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={channel.name}
                >
                  <span className="footer-social-icon">{channel.icon}</span>
                  <span>{channel.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span
          className={`footer-bottom-text ${isHome ? 'footer-bottom-text--light' : ''}`}
        >
          © {currentYear} GSG Design. Hecho en Argentina.
        </span>
        <div className="footer-bottom-links">
          <Link href="/contacto" className="footer-bottom-link">
            Solicitar asesoría
          </Link>
          <Link href="/distribuidores" className="footer-bottom-link">
            Encontrar distribuidor
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterM;
