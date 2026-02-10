import { getLedProfileByCode } from '@/lib/supabase/helpers';
import { notFound } from 'next/navigation';
import LedProfileDetailClient from './LedProfileDetailClient';

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
