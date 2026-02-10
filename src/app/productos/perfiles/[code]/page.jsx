import { getLedProfileByCode } from '@/lib/supabase/helpers';
import { notFound } from 'next/navigation';
import LedProfileDetailClient from './LedProfileDetailClient';

// Revalida la información cada 60 segundos (1 minuto)
// Esto asegura datos frescos sin saturar de requests a Supabase
export const revalidate = 60;

export default async function LedProfileDetailPage({ params }) {
  const { code } = params;

  const profile = await getLedProfileByCode(code);

  console.log('🖥️ Server Side Profile Fetch:', {
    code,
    found: !!profile,
    finishesCount: profile?.finishes?.length,
    mediaCount: profile?.media?.length,
  });

  if (!profile) {
    notFound();
  }

  return <LedProfileDetailClient profile={profile} />;
}
