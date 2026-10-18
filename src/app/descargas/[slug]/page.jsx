import Link from 'next/link';
import { getDownloadPage } from '@/lib/supabase';
import { formatFileSize } from '@/lib/format';
import TrackView from '@/components/analytics/TrackView';
import TrackedLink from '@/components/analytics/TrackedLink';

// Se llega escaneando el QR pegado en el equipo: siempre datos frescos
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function loadPage(slug) {
  try {
    return await getDownloadPage(slug);
  } catch (error) {
    // Un QR impreso nunca debería mostrar un error: caemos al aviso amable
    console.error('getDownloadPage failed:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await loadPage(slug);
  const title = result?.page.isActive ? result.page.title : 'Descargas';
  return { title, robots: { index: false } };
}

function Unavailable() {
  return (
    <div className="mx-auto max-w-xl text-center py-10">
      <h1 className="text-2xl md:text-3xl font-light text-gray-800">
        Esta página de descargas no está disponible
      </h1>
      <p className="text-gray-500 mt-3">
        Puede que el enlace haya cambiado. Escribinos o visitá nuestra web.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-gray-700 transition-colors"
      >
        Ir a gsgdesign.com.ar
      </Link>
    </div>
  );
}

export default async function DescargasPage({ params }) {
  const { slug } = await params;
  const result = await loadPage(slug);

  return (
    <div className="min-h-screen md:mt-10 lg:mt-24 xl:mt-32 px-4 md:px-10">
      {!result || !result.page.isActive ? (
        <Unavailable />
      ) : (
        <div className="mx-auto max-w-2xl">
          {/* Puede venir de un QR o de un enlace compartido: no se asume escaneo */}
          <TrackView event="view_download_page" metadata={{ location: 'download_page', slug: result.page.slug }} />
          <h1 className="text-2xl md:text-3xl font-light text-gray-800">{result.page.title}</h1>
          {result.page.description && (
            <p className="text-gray-500 mt-2 whitespace-pre-line">{result.page.description}</p>
          )}

          {result.files.length === 0 ? (
            <p className="text-gray-500 mt-8">Pronto vas a encontrar acá los archivos para descargar.</p>
          ) : (
            <ul className="mt-8 space-y-3">
              {result.files.map((file) => (
                <li key={file.id}>
                  <TrackedLink
                    event="document_click"
                    metadata={{
                      location: 'download_page',
                      slug: result.page.slug,
                      doc_type: 'download_page_file',
                      target_id: String(file.id),
                      doc_label: file.title,
                    }}
                    href={file.url}
                    target="_blank"
                    rel="noopener"
                    download
                    className="flex min-h-[56px] items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:border-gray-400 hover:shadow transition"
                  >
                    <img src="/imagenes/download.svg" alt="" className="h-6 w-6 shrink-0" />
                    <span className="flex-1 min-w-0">
                      <span className="block text-gray-800 break-words">{file.title}</span>
                      {file.sizeBytes ? (
                        <span className="block text-xs text-gray-500">PDF · {formatFileSize(file.sizeBytes)}</span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-sm font-medium text-gray-900">Descargar</span>
                  </TrackedLink>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 mb-16">
            <Link href="/" className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900">
              Ver todos nuestros productos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
