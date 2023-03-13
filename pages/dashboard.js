import Layout from '@/components/Layout';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/dashboard',
        permanent: false,
      },
    };

  if (data.user.user_metadata.role !== 'admin') {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: data.user,
      user: data.user,
    },
  };
};

export default function Dashboard({ user }) {
  return (
    <Layout
      title={'Dashboard'}
      username={user.user_metadata?.username}
      role={user?.user_metadata?.role}
      url={'welcome'}
      userId={user?.id}
    >
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <Link
          href={'/dashboard/country/new'}
          className="w-2/3 py-5 mb-6 text-xl font-bold text-center text-white rounded-lg bg-gradient font-lato"
        >
          Upload Country
        </Link>
        <Link
          href={'/dashboard/city/new'}
          className="w-2/3 py-5 mb-6 text-xl font-bold text-center text-white rounded-lg bg-gradient font-lato"
        >
          Upload City
        </Link>
        <Link
          href={'/dashboard/category'}
          className="w-2/3 py-5 mb-6 text-xl font-bold text-center text-white rounded-lg bg-gradient font-lato"
        >
          Upload Category
        </Link>
        <Link
          href={'/dashboard/itinerary/new'}
          className="w-2/3 py-5 mb-6 text-xl font-bold text-center text-white rounded-lg bg-gradient font-lato"
        >
          Upload Itinerary
        </Link>
      </div>
    </Layout>
  );
}
