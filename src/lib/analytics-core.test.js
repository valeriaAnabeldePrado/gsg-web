import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EVENTS,
  FAMILIES,
  environmentForHost,
  referrerOrigin,
  sanitizePath,
  productKey,
  buildEventRow,
  createDeduper,
  fileIdFromPath,
} from './analytics-core.js';

test('environmentForHost', () => {
  assert.equal(environmentForHost('www.gsgdesign.com.ar'), 'production');
  assert.equal(environmentForHost('gsgdesign.com.ar'), 'production');
  assert.equal(environmentForHost('localhost'), 'development');
  assert.equal(environmentForHost('127.0.0.1'), 'development');
  assert.equal(environmentForHost('gsg-web-v2.vercel.app'), 'preview');
  assert.equal(environmentForHost(''), 'development');
});

test('referrerOrigin guarda solo el origen', () => {
  assert.equal(referrerOrigin('https://www.google.com/search?q=lampara&tel=1155555555'), 'https://www.google.com');
  assert.equal(referrerOrigin(''), '');
  assert.equal(referrerOrigin('no es url'), '');
  assert.equal(referrerOrigin('android-app://com.google.android.googlequicksearchbox/'), 'android-app://com.google.android.googlequicksearchbox');
});

test('sanitizePath quita query y hash', () => {
  assert.equal(sanitizePath('/productos/techo/KRO?email=a@b.com#x'), '/productos/techo/KRO');
  assert.equal(sanitizePath(''), '/');
  assert.equal(sanitizePath('/a'.repeat(200)).length, 200);
});

test('productKey distingue familias con el mismo código', () => {
  assert.equal(productKey(FAMILIES.ACCESORIOS, 'P02'), 'accesorios:P02');
  assert.notEqual(productKey(FAMILIES.PERFILES, 'P02'), productKey(FAMILIES.ACCESORIOS, 'P02'));
});

test('fileIdFromPath', () => {
  assert.equal(fileIdFromPath('https://x.r2.dev/led-profiles/P02/datasheet/123-abc.pdf?x=1'), '123-abc.pdf');
  assert.equal(fileIdFromPath(''), '');
});

const ctx = {
  pathname: '/productos/techo/KRO',
  referrer: 'https://www.google.com/search?q=x',
  hostname: 'www.gsgdesign.com.ar',
  now: new Date('2026-10-20T15:00:00.000Z'),
  timezone: 'America/Buenos_Aires',
};

test('buildEventRow: vista de producto con familia', () => {
  const row = buildEventRow(
    EVENTS.VIEW_PRODUCT,
    { product: { family: FAMILIES.LUMINARIAS, code: 'KRO', name: 'Kro', category: 'Techo' } },
    ctx,
  );
  assert.deepEqual(row, {
    event_type: 'view_product',
    product_code: 'KRO',
    product_name: 'Kro',
    category: 'Techo',
    metadata: {
      v: 2,
      env: 'production',
      path: '/productos/techo/KRO',
      referrer: 'https://www.google.com',
      viewedAt: '2026-10-20T15:00:00.000Z',
      timezone: 'America/Buenos_Aires',
      family: 'luminarias',
      product_key: 'luminarias:KRO',
    },
  });
});

test('buildEventRow: acción general sin producto', () => {
  const row = buildEventRow(EVENTS.CATALOG_CLICK, { metadata: { location: 'home_catalog' } }, { ...ctx, pathname: '/' });
  assert.equal(row.product_code, null);
  assert.equal(row.metadata.family, undefined);
  assert.equal(row.metadata.location, 'home_catalog');
});

test('buildEventRow: la metadata no pisa los campos base', () => {
  const row = buildEventRow(EVENTS.CATALOG_CLICK, { metadata: { env: 'production', path: '/x?tel=1' } }, {
    ...ctx,
    hostname: 'localhost',
  });
  assert.equal(row.metadata.env, 'development');
  assert.equal(row.metadata.path, '/productos/techo/KRO');
});

test('createDeduper: descarta repetidos dentro de la ventana y acepta después', () => {
  const shouldSend = createDeduper();
  assert.equal(shouldSend('view:a', 1000, 2000), true);
  assert.equal(shouldSend('view:a', 1500, 2000), false); // re-render / doble efecto
  assert.equal(shouldSend('view:b', 1500, 2000), true); // otra ficha
  assert.equal(shouldSend('view:a', 3500, 2000), true); // nueva visita legítima
});
