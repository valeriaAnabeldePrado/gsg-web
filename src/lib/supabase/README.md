# Supabase SDK - GSG Web

SDK completo para interactuar con la base de datos de Supabase.

## 📁 Estructura

```
src/lib/supabase/
├── client.js      # Cliente para componentes del cliente (Client Components)
├── server.js      # Cliente admin para el servidor (API Routes, Server Components)
├── helpers.js     # Funciones helper para operaciones CRUD
└── index.js       # Exports centralizados
```

## 🚀 Uso Básico

### Importar en Client Components

```javascript
import { supabase, listProducts, getProductByCode } from '@/lib/supabase';
```

### Importar en Server Components / API Routes

```javascript
import { supabaseAdmin } from '@/lib/supabase';
```

## 📦 Funciones Disponibles

### **Productos**

#### `listProducts(options)`

Lista productos con paginación y filtros.

```javascript
// Ejemplo básico
const { data, total, page, pageSize } = await listProducts();

// Con filtros
const { data } = await listProducts({
  page: 1,
  pageSize: 24,
  categorySlug: 'perfiles-aluminio',
  featured: true,
});
```

**Opciones:**

- `page` (number): Página actual (default: 1)
- `pageSize` (number): Productos por página (default: 24)
- `categorySlug` (string): Filtrar por slug de categoría
- `featured` (boolean): Solo productos destacados

**Retorna:**

```javascript
{
  data: Product[],     // Array de productos normalizados
  total: number,       // Total de productos
  page: number,        // Página actual
  pageSize: number     // Tamaño de página
}
```

#### `getProductByCode(code)`

Obtiene un producto específico por su código.

```javascript
const product = await getProductByCode('GSG-001');
```

**Estructura del Producto:**

```javascript
{
  id: uuid,
  code: string,
  name: string,
  description: string,
  isFeatured: boolean,
  createdAt: timestamp,
  category: {
    id: uuid,
    slug: string,
    name: string
  },
  media: [
    {
      id: uuid,
      path: string,
      kind: 'image' | 'video',
      alt_text: string
    }
  ],
  finishes: [
    {
      id: uuid,
      slug: string,
      name: string,
      hex_color: string,
      sheen: string,
      texture: string,
      material_base: string,
      swatch_url: string
    }
  ],
  variants: [
    {
      id: uuid,
      variantCode: string,
      name: string,
      includesLed: boolean,
      includesDriver: boolean,
      cantidad: number,
      lightTones: [
        {
          id: uuid,
          slug: string,
          name: string,
          kelvin: number
        }
      ],
      configurations: [
        {
          id: uuid,
          sku: string,
          watt: number,
          lumens: number,
          diameter_description: string,
          length_mm: number,
          width_mm: number,
          voltage: string,
          specs: jsonb
        }
      ]
    }
  ]
}
```

### **Categorías y Opciones**

#### `getFinishes()`

Obtiene todos los acabados disponibles.

```javascript
const finishes = await getFinishes();
```

#### `getLightTones()`

Obtiene todos los tonos de luz disponibles.

```javascript
const lightTones = await getLightTones();
```

### **Mutaciones: Productos**

#### `createProduct(payload)`

```javascript
const newProduct = await createProduct({
  code: 'GSG-002',
  name: 'Perfil LED Empotrar',
  description: 'Perfil de aluminio para empotrar',
  is_featured: false,
});
```

#### `updateProduct(id, patch)`

```javascript
const updated = await updateProduct(productId, {
  name: 'Nuevo nombre',
  description: 'Nueva descripción',
});
```

#### `deleteProduct(id)`

```javascript
await deleteProduct(productId);
```

#### `setProductFeatured(id, isFeatured)`

```javascript
await setProductFeatured(productId, true);
```

### **Mutaciones: Acabados (N:N)**

#### `addFinishToProduct(productId, finishId)`

```javascript
await addFinishToProduct(productId, finishId);
```

#### `removeFinishFromProduct(productId, finishId)`

```javascript
await removeFinishFromProduct(productId, finishId);
```

### **Mutaciones: Variantes**

#### `createVariant(productId, payload)`

```javascript
const variant = await createVariant(productId, {
  variant_code: 'GSG-001-V1',
  name: 'Variante 1m',
  includes_led: true,
  includes_driver: false,
  cantidad: 100,
});
```

#### `updateVariant(variantId, patch)`

```javascript
await updateVariant(variantId, { cantidad: 150 });
```

#### `deleteVariant(variantId)`

```javascript
await deleteVariant(variantId);
```

### **Mutaciones: Tonos de Luz (N:N)**

#### `attachLightToneToVariant(variantId, lightToneId)`

```javascript
await attachLightToneToVariant(variantId, lightToneId);
```

#### `detachLightToneFromVariant(variantId, lightToneId)`

```javascript
await detachLightToneFromVariant(variantId, lightToneId);
```

### **Mutaciones: Configuraciones (SKUs)**

#### `createConfiguration(variantId, payload)`

```javascript
const config = await createConfiguration(variantId, {
  sku: 'GSG-001-V1-3000K-12W',
  watt: 12,
  lumens: 1200,
  voltage: '12V',
  length_mm: 1000,
  specs: {},
});
```

#### `updateConfiguration(configId, patch)`

```javascript
await updateConfiguration(configId, { lumens: 1300 });
```

#### `deleteConfiguration(configId)`

```javascript
await deleteConfiguration(configId);
```

### **Media Assets**

#### `createMediaForProduct(productId, payload)`

```javascript
const media = await createMediaForProduct(productId, {
  path: '/images/product-01.jpg',
  kind: 'image',
  alt_text: 'Perfil LED frontal',
});
```

#### `listMediaForProduct(productId)`

```javascript
const mediaList = await listMediaForProduct(productId);
```

## 💡 Ejemplos de Uso en la Aplicación

### En una Página de Productos (Server Component)

```javascript
// app/productos/page.jsx
import { listProducts } from '@/lib/supabase';

export default async function ProductosPage({ searchParams }) {
  const { data: products } = await listProducts({
    page: Number(searchParams.page) || 1,
    categorySlug: searchParams.category,
    featured: searchParams.featured === 'true',
  });

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### En una Página de Detalle de Producto

```javascript
// app/productos/[code]/page.jsx
import { getProductByCode } from '@/lib/supabase';

export default async function ProductDetailPage({ params }) {
  const product = await getProductByCode(params.code);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      {/* Mostrar variantes */}
      {product.variants.map((variant) => (
        <div key={variant.id}>
          <h3>{variant.name}</h3>
          {/* Configuraciones */}
          {variant.configurations.map((config) => (
            <div key={config.id}>
              SKU: {config.sku} - {config.watt}W
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### En un API Route (Admin)

```javascript
// app/api/products/route.js
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(body)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
```

## 🔒 Seguridad

- **Client (`supabase`)**: Usa la `ANON_KEY` - respeta RLS (Row Level Security)
- **Server (`supabaseAdmin`)**: Usa la `SERVICE_ROLE_KEY` - bypasea RLS
- ⚠️ **NUNCA** uses `supabaseAdmin` en el cliente, solo en server-side code

## 📝 Notas

- Todas las funciones de lectura normalizan los datos usando `normalizeProduct()`
- Los errores se manejan con `throwIfError()` para logging consistente
- Las relaciones se cargan con Supabase joins usando la sintaxis de select anidado
