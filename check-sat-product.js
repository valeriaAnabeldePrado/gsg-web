import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vvwqbppvbobgbqfowmjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2d3FicHB2Ym9iZ2JxZm93bWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDMxNTY3NCwiZXhwIjoyMDQ1ODkxNjc0fQ.ysP8ib1jx4sBrAcR3qrLi--cOF6pjqK_J5PlZY3B-7c',
);

async function checkProduct() {
  console.log('\n=== Buscando productos con SAT en el código ===');
  const { data: products, error } = await supabase
    .from('products')
    .select('id, code, name, category')
    .ilike('code', '%SAT%');

  if (error) {
    console.error('Error:', error);
  } else {
  }

  const { data: colgantes, error: colError } = await supabase
    .from('products')
    .select('id, code, name, category')
    .eq('category', 'colgantes')
    .limit(5);

  if (colError) {
    console.error('Error:', colError);
  } else {
    console.log('Colgantes encontrados:', colgantes);
  }
}

checkProduct();
