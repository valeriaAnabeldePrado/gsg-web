import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = supabaseAdmin;

    const { data, error } = await supabase
      .from('distributors')
      .select('*, zone:distributor_zones(name)')
      .eq('active', true)
      .order('zone(name)', { ascending: true })
      .order('locality', { ascending: true })
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
