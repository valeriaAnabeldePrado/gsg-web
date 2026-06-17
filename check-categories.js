import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vvwqbppvbobgbqfowmjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2d3FicHB2Ym9iZ2JxZm93bWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDMxNTY3NCwiZXhwIjoyMDQ1ODkxNjc0fQ.ysP8ib1jx4sBrAcR3qrLi--cOF6pjqK_J5PlZY3B-7c',
);

async function checkCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error:', error);
  } else {
  }
}

checkCategories();
