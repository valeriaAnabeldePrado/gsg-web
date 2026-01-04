import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('distributors')
      .select('*')
      .eq('active', true)
      .order('province', { ascending: true })
      .order('city', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data || []);
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Failed to fetch distributors' },
      { status: 500 },
    );
  }
}
