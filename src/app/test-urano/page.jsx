
import { listProducts } from '@/lib/supabase/helpers';

export const dynamic = 'force-dynamic';

export default async function TestUranoPage() {
  let content = '';
  try {
    const { data } = await listProducts({ page: 1, pageSize: 1000 });
    // Filter for anything that might look like the missing variants
    const candidates = data.filter(p => 
      p.name.toLowerCase().includes('urano') || 
      p.name.toLowerCase().includes('oval') ||
      p.code.toLowerCase().includes('ura')
    );
    content = JSON.stringify(candidates, null, 2);
  } catch (e) {
    content = 'ERROR: ' + e.message;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      background: 'white', 
      zIndex: 99999, 
      overflow: 'auto',
      padding: '20px',
      color: 'black'
    }}>
      <h1>MY_DEBUG_START</h1>
      <pre>{content}</pre>
      <h1>MY_DEBUG_END</h1>
    </div>
  );
}
