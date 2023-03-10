import ConfigButton from '@/components/ConfigButton';
import LayoutProfile from '@/components/LayoutProfile';
import Profile from '@/components/Profile/Profile';
import ProfileLevel from '@/components/Profile/ProfileLevel';
import GoldBadge from '@/components/Stats/GoldBadge';
import TotalEarning from '@/components/Stats/TotalEarning';
import Verifications from '@/components/Stats/Verifications';
import Views from '@/components/Stats/Views';
import { getUserProfile } from '@/utils/getUserProfile';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export async function getServerSideProps(ctx) {
  const { username } = ctx.query;

  if (!username) return { notFound: true };
  const supabase = createServerSupabaseClient(ctx);

  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await getUserProfile(username);

  if (error) {
    console.log('error', error);
    return { notFound: true };
  }

  if (!data?.role) return { notFound: true };

  return { props: { userProfile: data, user: userData } };
}

export default function Username({ userProfile, userData }) {
  const [stats, setStats] = useState(false);

  return (
    <LayoutProfile
      IconRight={ConfigButton}
      firstOption={'PROFILE'}
      secondOption={'STATS'}
      avatar={userProfile?.avatar}
      name={`${userProfile?.first_name} ${userProfile?.last_name}`}
      changeFirstContent={() => setStats(false)}
      changeSecondContent={() => setStats(true)}
      currentLocation={stats}
      username={userData?.user_metadata?.username}
      url={`/welcome`}
      role={userData?.user_metadata?.role}
    >
      {!stats ? (
        <Profile
          description={userProfile?.description}
          language={userProfile.language}
          location={userProfile.location}
          username={userProfile.username}
        />
      ) : (
        <>
          {userProfile.username === 'super admin' ? (
            <>
              <TotalEarning />
              <Views />
              <ProfileLevel />
              <GoldBadge />
              <Verifications />
            </>
          ) : (
            <div className="py-4 w-4/5 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#7bb6f469] to-slate-100  mt-10 mb-10 rounded-lg">
              <p className="font-semibold tracking-wider text-center font-lato text-chenkster-gray">
                We are currently working on this feature. Please check back
                later.
              </p>
            </div>
          )}
        </>
      )}
    </LayoutProfile>
  );
}
