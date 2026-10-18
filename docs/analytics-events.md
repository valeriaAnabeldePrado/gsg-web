# Contrato de eventos de analytics

Los eventos se guardan en `public.analytics_events` (Supabase), una fila por evento. Se insertan desde el navegador con la key pública; la lectura solo la hace el backoffice con service role.

Código: `src/lib/analytics-core.js` (lógica pura, con pruebas) y `src/lib/analytics.js` (envío). Para medir:

- **Fichas:** `useTrackProductView({ family, code, name, category })` (`src/components/analytics/useTrackProductView.js`).
- **Clics:** `trackClick(EVENTS.X, { metadata, attributeToPage })`, o `<TrackedLink>` en componentes de servidor.
- **Vistas en páginas de servidor:** `<TrackView event metadata />`.

## Columnas

| Columna | Contenido |
| --- | --- |
| `event_type` | Uno de los eventos de la tabla de abajo |
| `product_code` | Código del producto. En rollos LED, el id de la familia. `null` en acciones generales |
| `product_name` | Nombre visible del producto |
| `category` | Categoría del catálogo (ej. Colgantes, Perfiles LED) |
| `metadata` | JSON con los campos de abajo |

## `metadata` común (v2)

| Campo | Contenido |
| --- | --- |
| `v` | Versión del contrato: `2`. Los eventos históricos no lo tienen |
| `env` | `production` (gsgdesign.com.ar), `preview` (otros dominios, ej. vercel.app) o `development` (localhost). Los reportes solo cuentan `production` |
| `path` | Ruta de la página, sin query ni hash |
| `referrer` | Solo el origen (`https://www.google.com`), nunca la URL completa |
| `viewedAt` | Fecha y hora ISO del navegador |
| `timezone` | Zona horaria del navegador (compatibilidad) |
| `family` | Solo si hay producto: `luminarias`, `perfiles`, `rollos`, `accesorios` o `fuentes` |
| `product_key` | Solo si hay producto: `familia:código`. Distingue productos de familias distintas que comparten código |
| `location` | Dónde está el botón o enlace |
| `target_id` | Identificador estable del archivo, distribuidor o motivo |

Nunca se guardan teléfonos, correos, mensajes ni URLs con parámetros.

## Eventos

| Evento | Momento que representa | `metadata` específica | Atribución a producto |
| --- | --- | --- | --- |
| `view_product` | Apertura de una ficha con sus datos cargados (las 5 familias) | `family`, `product_key` | Siempre |
| `whatsapp_widget_open` | Apertura del panel flotante de WhatsApp | `location: floating_widget` | Solo si se abre dentro de una ficha |
| `whatsapp_click` | Clic en una opción que abre un enlace a WhatsApp. No confirma que se haya enviado un mensaje | `location`, `reason` (`business_inquiry` o `existing_customer`) | Solo si ocurre dentro de una ficha |
| `document_click` | Clic en documentación técnica o en un archivo de una página de descargas. No confirma que la descarga se haya completado | `location` (`product_detail` o `download_page`), `doc_type`, `target_id`, `doc_label`, `slug` | En fichas sí; en páginas de descargas no |
| `catalog_click` | Clic en "Descargar catálogo" | `location: home_catalog_section`, `target_id: catalogo-general` | Nunca (acción general) |
| `distributor_contact_click` | Clic en Llamar o Ver mapa de un distribuidor | `location: distributors_list`, `action` (`phone` o `maps`), `target_id` (id del distribuidor), `distributor_name`, `province` | Nunca |
| `view_download_page` | Apertura de una página de descargas válida y activa. Puede venir de un QR o de un enlace compartido | `location: download_page`, `slug` | Nunca |

## Duplicados

- **Vistas:** el mismo evento con el mismo producto o página, en la misma ruta, se ignora durante 2 s (re-renders y el doble efecto de React). Una visita posterior se cuenta.
- **Clics:** el mismo clic (mismo evento, ubicación, destino y producto) se ignora durante 0,7 s (doble clic). Los clics posteriores se cuentan.

## Envío

El insert no se espera: nunca demora la navegación, la apertura de WhatsApp ni la descarga. Si falla, solo se escribe en la consola.

## Históricos

- **Eventos `view_product` sin `family`** (anteriores a v2): se toman como `luminarias`, que era la única familia medida.
- **Eventos sin `env`:** se toman como producción, salvo que el `referrer` sea `localhost` o `*.vercel.app`.
