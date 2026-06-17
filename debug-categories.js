import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Leer .env
const envPath = join(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach((line) => {
  const [key, ...values] = line.split('=');
  if (key && values.length) {
    env[key.trim()] = values.join('=').trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

async function debugCategories() {
  console.log('\n=== 1. Verificando todas las categorías ===');
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (catError) {
    console.error('Error:', catError);
  } else {
    console.log('Categorías encontradas:', categories);
  }

  console.log('\n=== 2. Verificando productos con sus categorías ===');
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('id, code, name, category_id, category:categories(id, slug, name)')
    .order('name')
    .limit(20);

  if (prodError) {
    console.error('Error:', prodError);
  } else {
    console.log('Productos (primeros 20):');
    products.forEach((p) => {
      console.log(
        `  - ${p.code} (${p.name}): category_id=${p.category_id}, slug=${p.category?.slug || 'NULL'}`,
      );
    });
  }

  console.log('\n=== 3. Contando productos por categoría ===');
  const { data: counts, error: countError } = await supabase
    .from('products')
    .select('category_id, category:categories(name, slug)', { count: 'exact' });

  if (countError) {
    console.error('Error:', countError);
  } else {
    const countsByCategory = counts.reduce((acc, p) => {
      const catName = p.category?.name || 'Sin categoría';
      const catSlug = p.category?.slug || 'null';
      const key = `${catName} (${catSlug})`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    console.log('Conteo por categoría:');
    Object.entries(countsByCategory).forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count} productos`);
    });
  }

  console.log('\n=== 4. Probando filtro con categorySlug="colgantes" ===');
  const { data: colgantesTest, error: colError } = await supabase
    .from('products')
    .select('id, code, name, category:categories!inner(id, slug, name)')
    .eq('categories.slug', 'colgantes');

  if (colError) {
    console.error('Error:', colError);
  } else {
    console.log(
      `Productos encontrados con slug="colgantes": ${colgantesTest.length}`,
    );
    colgantesTest.forEach((p) => {
      console.log(`  - ${p.code} (${p.name}): ${p.category.name}`);
    });
  }

  console.log('\n=== 5. Probando filtro con categorySlug="lamparas" ===');
  const { data: lamparasTest, error: lampError } = await supabase
    .from('products')
    .select('id, code, name, category:categories!inner(id, slug, name)')
    .eq('categories.slug', 'lamparas');

  if (lampError) {
    console.error('Error:', lampError);
  } else {
    console.log(
      `Productos encontrados con slug="lamparas": ${lamparasTest.length}`,
    );
    lamparasTest.forEach((p) => {
      console.log(`  - ${p.code} (${p.name}): ${p.category.name}`);
    });
  }
}

debugCategories().catch(console.error);
