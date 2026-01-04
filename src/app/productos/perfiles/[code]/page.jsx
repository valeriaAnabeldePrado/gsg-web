import { getLedProfileByCode } from '@/lib/supabase/helpers';
import { notFound } from 'next/navigation';
import LedProfileDetailClient from './LedProfileDetailClient';

export default async function LedProfileDetailPage({ params }) {
  const { code } = params;

  const profile = await getLedProfileByCode(code);

  if (!profile) {
    notFound();
  }

  return <LedProfileDetailClient profile={profile} />;
}
