import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vvwqbppvbobgbqfowmjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2d3FicHB2Ym9iZ2JxZm93bWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDMxNTY3NCwiZXhwIjoyMDQ1ODkxNjc0fQ.ysP8ib1jx4sBrAcR3qrLi--cOF6pjqK_J5PlZY3B-7c',
);

async function checkProfileStructure() {
  // Buscar tablas que contengan "profile" en el nombre
  const { data: tables, error: tablesError } = await supabase
    .rpc('exec_sql', {
      sql: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%profile%' OR table_name LIKE '%perfil%'`,
    })
    .catch(() => null);

  // Si no funciona el RPC, intentar directamente

  const { data: profiles, error } = await supabase
    .from('products')
    .select(
      `
      *,
      category:categories(*),
      media_assets(*),
      product_finishes(finish:finishes(*)),
      product_variants(*)
    `,
    )
    .eq('category', 5) // ID de perfiles según los logs anteriores
    .limit(1);

  if (error) {
    console.error('Error:', error);
  } else {
  }

  // Buscar tablas con profile en el nombre
  const { data: allTables } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .like('table_name', '%profile%')
    .catch(() => ({ data: null }));

  if (allTables) {
    console.log('Tablas con "profile":', allTables);
  }
}

checkProfileStructure();
