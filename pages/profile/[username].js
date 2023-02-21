import LayoutProfile from '@/components/LayoutProfile';
import Profile from '@/components/Profile/Profile';
import ProfileLevel from '@/components/Profile/ProfileLevel';
import GoldBadge from '@/components/Stats/GoldBadge';
import TotalEarning from '@/components/Stats/TotalEarning';
import Verifications from '@/components/Stats/Verifications';
import Views from '@/components/Stats/Views';
import ConfigSvg from '@/components/Svg/ConfigSvg';
import { getUserProfile } from '@/utils/getUserProfile';
import { useState } from 'react';

export async function getServerSideProps({ query }) {
  const { username } = query;

  if (!username) return { notFound: true };

  const { data, error } = await getUserProfile(username);

  if (error) {
    console.log('error', error);
    return { notFound: true };
  }

  if (!data[0]) return { notFound: true };

  return { props: { userProfile: data[0] } };
}

export default function Username({ userProfile }) {
  const [stats, setStats] = useState(false);

  return (
    <LayoutProfile
      IconRight={ConfigSvg}
      firstOption={'PROFILE'}
      secondOption={'STATS'}
      avatar={userProfile?.avatar_url}
      name={`${userProfile?.first_name} ${userProfile?.last_name}`}
      changeFirstContent={() => setStats(false)}
      changeSecondContent={() => setStats(true)}
      currentLocation={stats}
      href={`/profile/${userProfile.username}/settings`}
    >
      {!stats ? (
        <Profile
          description={userProfile?.description}
          language={userProfile.language}
          location={userProfile.location}
        />
      ) : (
        <>
          <TotalEarning />
          <Views />
          <ProfileLevel />
          <GoldBadge />
          <Verifications />
        </>
      )}
    </LayoutProfile>
  );
}
