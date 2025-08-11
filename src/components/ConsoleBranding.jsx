'use client';
import { useEffect } from 'react';

const ConsoleBranding = () => {
  useEffect(() => {
    const showConsoleBranding = () => {
      const styles = {
        title:
          'color: #06b6d4; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
        subtitle: 'color: #8b5cf6; font-size: 18px; font-weight: bold;',
        text: 'color: #374151; font-size: 14px;',
        accent: 'color: #10b981; font-size: 14px; font-weight: bold;',
        warning: 'color: #ef4444; font-size: 12px; font-weight: bold;',
        highlight: 'color: #f59e0b; font-size: 16px; font-weight: bold;',
      };

      console.clear();
      console.log('%c☁️ SMARTCLOUD STUDIO', styles.title);
      console.log(
        '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        styles.accent,
      );
      console.log(
        '%c Desarrollamos soluciones digitales completas',
        styles.subtitle,
      );
      console.log('%c', '');
      console.log('%c Nuestros servicios:', styles.highlight);
      console.log('%c • Desarrollo Web & Software', styles.text);
      console.log('%c • Identidad de Marca & Diseño', styles.text);
      console.log('%c • Aplicaciones Mobile', styles.text);
      console.log('%c • Arquitectura Cloud', styles.text);
      console.log('%c', '');
      console.log('%c¿Te gusta lo que ves? ¡Trabajemos juntos!', styles.text);
      console.log(
        '%c 🌐 Visita: https://www.smartcloudstudio.com/',
        styles.accent,
      );
      console.log(
        '%c 📧 Hablemos: contacto@smartcloudstudio.com',
        styles.accent,
      );
      console.log('%c', '');
      console.log(
        '%c 🚀 Esta web fue desarrollada con Next.js + Tailwind CSS + Render.com',
        styles.text,
      );
      console.log('%c', '');
      console.log(
        '%c⚠️  Advertencia: Esta consola es para desarrolladores.',
        styles.warning,
      );
      console.log(
        '%c   Si alguien te pidió que copies/pegues algo aquí, es probablemente una estafa.',
        styles.warning,
      );
      console.log('%c', '');
      console.log(
        '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        styles.accent,
      );

      // ASCII Art del logo SmartCloud
      console.log(
        `%c
                        ██████╗ ██████╗
                       ██╔════╝██╔════╝
                       ╚█████╗ ██║     
                        ╚═══██╗██║     
                       ██████╔╝╚██████╗
                       ╚═════╝  ╚═════╝
                        ☁️ STUDIO ☁️                                        
    `,
        'color: #06b6d4; font-family: monospace; font-size: 10px;',
      );
    };

    // Ejecutar el branding después de que el componente se monte
    const timer = setTimeout(showConsoleBranding, 1500);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  // Este componente no renderiza nada visible
  return null;
};

export default ConsoleBranding;
