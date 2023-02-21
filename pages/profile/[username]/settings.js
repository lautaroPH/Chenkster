import LayoutProfile from '@/components/LayoutProfile';
import FollowUs from '@/components/Profile/settings/FollowUs';
import Help from '@/components/Profile/settings/Help';
import SettingsProfile from '@/components/Profile/settings/Settings';
import LightBulbSvg from '@/components/Svg/LightBulbSvg';
import useSession from '@/hooks/useSession';
import useUser from '@/hooks/useUser';
import { getUserProfile } from '@/utils/getUserProfile';
import { useRouter } from 'next/router';
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

export default function Settings({ userProfile }) {
  const [help, setHelp] = useState(false);
  const session = useSession();
  const router = useRouter();
  const user = useUser();

  if (session === null) {
    router.push(`/login`);
  }

  if (user && user?.user_metadata?.username !== userProfile.username) {
    router.push(`/profile/${user?.user_metadata?.username}/settings`);
  }

  return (
    <>
      {user?.user_metadata?.username === userProfile.username && (
        <LayoutProfile
          IconRight={LightBulbSvg}
          firstOption={'SETTINGS'}
          secondOption={'HELP'}
          avatar={userProfile?.avatar_url}
          name={`${userProfile?.first_name} ${userProfile?.last_name}`}
          changeFirstContent={() => setHelp(false)}
          changeSecondContent={() => setHelp(true)}
          currentLocation={help}
          href={`/profile/${userProfile.username}/settings`}
        >
          {!help ? <SettingsProfile /> : <Help />}
          <FollowUs />
        </LayoutProfile>
      )}
    </>
  );
}
