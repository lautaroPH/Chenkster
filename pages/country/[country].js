import DiscoverCountry from '@/components/Country/DiscoverCountry';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import City from '@/components/Country/City';
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

export default function Country({ user }) {
  const router = useRouter();
  const { country } = router.query;

  return (
    <Layout title={'Select the city'} username={user?.user_metadata?.username}>
      <DiscoverCountry country={country} />
      <div className="mb-10">
        <City country={'Italy'} city={'Milan'} />
        <City country={'Italy'} city={'Milan'} />
        <City country={'Italy'} city={'Milan'} />
        <City country={'Italy'} city={'Milan'} />
      </div>
    </Layout>
  );
}
