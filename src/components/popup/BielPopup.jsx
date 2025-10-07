'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './BielPopup.css';

const BielPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Mostrar el popup después de 1.5 segundos de cargar la página
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Configurar el contador
    const eventDate = new Date('2025-10-22T09:00:00-03:00'); // 22 de octubre 2025, 9:00 AM Argentina

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Actualizar inmediatamente
    updateCountdown();

    // Actualizar cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAccreditation = () => {
    // Redirigir al sitio oficial de acreditación de BIEL
    window.open(
      'https://biel-light-building.ar.messefrankfurt.com/buenosaires/es/acreditacion.html',
      '_blank',
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="biel-popup-overlay" onClick={handleClose}>
      <div
        className="biel-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          className="biel-popup-close"
          onClick={handleClose}
          aria-label="Cerrar popup"
        >
          ×
        </button>

        {/* Contenido del popup */}
        <div className="biel-popup-content">
          {/* Header corporativo */}
          <div className="biel-popup-header">
            <div className="biel-popup-title-section">
              <h2 className="biel-popup-event-name">BIEL Light + Building</h2>
              <h3 className="biel-popup-event-year">Buenos Aires 2025</h3>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="biel-popup-body">
            <div className="biel-popup-highlight">
              <h4 className="biel-popup-main-text">
                ¡Tu Acreditación gratuita te espera!
              </h4>
            </div>

            <div className="biel-popup-details">
              {/* Contador regresivo */}
              <div className="biel-popup-countdown">
                <div className="biel-countdown-title">Faltan:</div>
                <div className="biel-countdown-grid">
                  <div className="biel-countdown-item">
                    <div className="biel-countdown-number">{timeLeft.days}</div>
                    <div className="biel-countdown-label">Días</div>
                  </div>
                  <div className="biel-countdown-item">
                    <div className="biel-countdown-number">
                      {timeLeft.hours}
                    </div>
                    <div className="biel-countdown-label">Horas</div>
                  </div>
                  <div className="biel-countdown-item">
                    <div className="biel-countdown-number">
                      {timeLeft.minutes}
                    </div>
                    <div className="biel-countdown-label">Min</div>
                  </div>
                  <div className="biel-countdown-item">
                    <div className="biel-countdown-number">
                      {timeLeft.seconds}
                    </div>
                    <div className="biel-countdown-label">Seg</div>
                  </div>
                </div>
              </div>

              <div className="biel-popup-date-location">
                <div className="biel-popup-date">
                  <svg
                    className="biel-popup-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                  <span>22 al 25 de octubre</span>
                </div>
                <div className="biel-popup-location">
                  <svg
                    className="biel-popup-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>La Rural</span>
                </div>
              </div>

              <div className="biel-popup-description">
                <p>
                  Descubrí las charlas técnicas y novedades en iluminación y
                  construcción
                </p>
                <div className="biel-popup-stand">
                  <strong>Te esperamos en el stand 2H-41</strong>
                </div>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="biel-popup-actions">
              <button
                className="biel-popup-cta-button"
                onClick={handleAccreditation}
              >
                <span>Acreditate ahora</span>
                <svg
                  className="biel-popup-arrow"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BielPopup;
