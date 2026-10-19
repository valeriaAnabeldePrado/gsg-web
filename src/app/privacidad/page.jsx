import Link from 'next/link';
import FooterM from '@/components/footer/footer';

// Borrador: el texto final lo tiene que aprobar GSG (responsable de los datos)
const LAST_UPDATED = '19 de octubre de 2026';
const CONTACT_EMAIL = 'ventas@gsgdesign.com';

export const metadata = {
  title: 'Política de privacidad | GSG DESIGN',
  description:
    'Cómo GSG Design recopila, usa y protege los datos de quienes visitan su sitio web.',
};

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-medium text-gray-900">{title}</h2>
      <div className="mt-3 space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

const linkClass = 'text-gray-900 underline underline-offset-2 hover:text-red-600';

export default function PrivacidadPage() {
  return (
    <div className="pt-10">
      <main className="min-h-screen md:mt-10 lg:mt-24 xl:mt-32 px-4 md:px-10 pb-20">
        <article className="mx-auto max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900">Política de privacidad</h1>
          <p className="mt-3 text-sm text-gray-500">Última actualización: {LAST_UPDATED}</p>

          <p className="mt-8 text-gray-600 leading-relaxed">
            En GSG Design S.R.L. (&quot;GSG&quot;) respetamos tu privacidad. Esta política explica qué datos
            recopilamos cuando visitás este sitio, para qué los usamos y qué derechos tenés, de acuerdo
            con la Ley 25.326 de Protección de los Datos Personales de la República Argentina.
          </p>

          <Section title="Responsable de los datos">
            <p>
              GSG Design S.R.L., con domicilio en Albariño 1775, Ciudad Autónoma de Buenos Aires,
              Argentina. Podés escribirnos a{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                {CONTACT_EMAIL}
              </a>{' '}
              o llamarnos al +54 11 5263 0462.
            </p>
          </Section>

          <Section title="Datos que nos das">
            <p>
              Cuando completás el formulario de{' '}
              <Link href="/contacto" className={linkClass}>
                contacto
              </Link>{' '}
              nos enviás tu nombre, tu email y el mensaje que escribas. Si nos contactás por WhatsApp,
              teléfono o email, recibimos los datos que compartas por ese medio.
            </p>
            <p>
              Usamos esos datos únicamente para responder tu consulta, enviarte presupuestos o
              información que nos pidas. No los vendemos ni los cedemos a terceros con fines
              comerciales.
            </p>
          </Section>

          <Section title="Datos de navegación">
            <p>
              Para entender cómo se usa el sitio y mejorarlo, medimos la navegación de forma
              estadística. Usamos estas herramientas:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-medium text-gray-800">Google Analytics y Google Tag Manager</strong>{' '}
                (Google LLC): usan cookies para medir visitas, páginas vistas, dispositivo, ubicación
                aproximada y origen del tráfico. Más información en{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  cómo usa Google los datos de los sitios que usan sus servicios
                </a>
                .
              </li>
              <li>
                <strong className="font-medium text-gray-800">Microsoft Clarity</strong> (Microsoft
                Corporation): usa cookies para registrar de forma anónima cómo se interactúa con las
                páginas (clics, desplazamiento y mapas de calor), y así detectar problemas de uso. Más
                información en la{' '}
                <a
                  href="https://privacy.microsoft.com/es-es/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  declaración de privacidad de Microsoft
                </a>
                .
              </li>
              <li>
                <strong className="font-medium text-gray-800">Vercel Web Analytics</strong> (Vercel
                Inc.): mide visitas de forma agregada, sin cookies.
              </li>
              <li>
                <strong className="font-medium text-gray-800">Estadísticas propias</strong>: registramos
                qué productos se consultan y qué acciones se realizan (por ejemplo, abrir WhatsApp o
                descargar una ficha técnica), junto con la página y el sitio de origen. No usamos cookies para esto ni guardamos tu dirección
                IP ni datos que te identifiquen.
              </li>
            </ul>
            <p>
              Algunos de estos proveedores procesan los datos en servidores fuera de la Argentina.
            </p>
          </Section>

          <Section title="Cómo desactivar las cookies">
            <p>
              Podés bloquear o borrar las cookies desde la configuración de tu navegador. También
              podés instalar el{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                complemento de inhabilitación de Google Analytics
              </a>
              . El sitio sigue funcionando sin cookies.
            </p>
          </Section>

          <Section title="Tus derechos">
            <p>
              Podés pedirnos en cualquier momento acceder a tus datos, corregirlos, actualizarlos o
              eliminarlos, escribiendo a{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                {CONTACT_EMAIL}
              </a>
              . Respondemos los pedidos de acceso dentro de los 10 días corridos y los de rectificación
              o supresión dentro de los 5 días hábiles, como establece la Ley 25.326.
            </p>
            <p>
              La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la
              Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan
              con relación al incumplimiento de las normas sobre protección de datos personales.
            </p>
          </Section>

          <Section title="Cambios en esta política">
            <p>
              Podemos actualizar esta política si cambian las herramientas que usamos. La fecha de la
              última actualización figura al principio de esta página.
            </p>
          </Section>
        </article>
      </main>
      <FooterM />
    </div>
  );
}
