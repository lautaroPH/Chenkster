import AskChenkster from '@/components/AskChenkster';
import Itinerary from '@/components/Category/Itinerary';
import Layout from '@/components/Layout';
import PreferencesSvg from '@/components/Svg/PreferencesSvg';
import ShufleSvg from '@/components/Svg/ShufleSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
    },
  };
};

export default function Category({ user }) {
  return (
    <Layout
      title={'Explore our top suggestions'}
      username={user?.user_metadata?.username}
    >
      <div className="flex items-center justify-center">
        <button className="flex items-center justify-center px-2 py-1 mr-5 text-white rounded-lg gap-x-2 bg-gradient">
          Preferences <PreferencesSvg />
        </button>
        <button className="flex items-center justify-center px-2 py-1 text-white rounded-lg gap-x-2 bg-gradient">
          Shuffle <ShufleSvg />
        </button>
      </div>
      <p className="my-5 font-bold font-lato text-chenkster-gray">
        Best 3 picks for you
      </p>

      <Itinerary
        category={'Eating-out'}
        city={'Milan'}
        country={'Italy'}
        itinerary={'Assaje'}
      />
      <Itinerary
        category={'Eating-out'}
        city={'Milan'}
        country={'Italy'}
        itinerary={'Assaje'}
      />
      <Itinerary
        category={'Eating-out'}
        city={'Milan'}
        country={'Italy'}
        itinerary={'Assaje'}
      />

      <AskChenkster />
    </Layout>
  );
}
