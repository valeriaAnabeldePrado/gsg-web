const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length) {
      env[key.trim()] = valueParts
        .join('=')
        .trim()
        .replace(/^["']|["']$/g, '');
    }
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

async function checkUrano() {
  console.log('🔍 Buscando producto URA-C con query completa...\n');

  // Usar el mismo query que helpers.js
  const PRODUCT_SELECT = `
    id, code, name, description, is_featured, created_at,
    category:categories ( id, slug, name ),
    media_assets!media_assets_product_id_fkey ( id, path, kind, alt_text, variant_id, mime_type, file_size_bytes, title ),
    product_finishes (
      finish:finishes ( id, slug, name, hex_color, sheen, texture, material_base, swatch_url )
    ),
    product_variants (
      id, variant_code, name, includes_led, includes_driver, cantidad,
      variant_light_tones (
        light_tone:light_tones ( id, slug, name, kelvin )
      ),
      variant_configurations (
        id, sku, name, watt, lumens, diameter_description,
        length_cm, width_cm, voltage, specs
      )
    )
  `;

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .ilike('code', 'ura-c')
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('📦 Producto:', data.code, '-', data.name);
  console.log(
    '\n🔍 Product Variants encontradas:',
    data.product_variants?.length || 0,
  );
  console.log('\nVariantes completas:');
  console.log(JSON.stringify(data.product_variants, null, 2));
}

checkUrano().catch(console.error);
