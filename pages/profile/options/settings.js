import LayoutProfile from '@/components/LayoutProfile';
import FollowUs from '@/components/Profile/settings/FollowUs';
import Help from '@/components/Profile/settings/Help';
import SettingsProfile from '@/components/Profile/settings/Settings';
import LightBulbSvg from '@/components/Svg/LightBulbSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/profile/options/settings',
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: data.user,
      user: data.user,
    },
  };
};

export default function Settings({ user }) {
  const [help, setHelp] = useState(false);
  const { user_metadata } = user;

  return (
    <LayoutProfile
      IconRight={LightBulbSvg}
      firstOption={'SETTINGS'}
      secondOption={'HELP'}
      avatar={user_metadata?.avatar}
      name={`${user_metadata?.first_name} ${user_metadata?.last_name}`}
      changeFirstContent={() => setHelp(false)}
      changeSecondContent={() => setHelp(true)}
      currentLocation={help}
      href={`/profile/options/settings`}
      username={user_metadata.username}
    >
      {!help ? <SettingsProfile /> : <Help />}
      <FollowUs />
    </LayoutProfile>
  );
}
