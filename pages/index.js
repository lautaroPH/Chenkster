import AboutChenkster from '@/components/AboutChenkster/AboutChenkster';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data?.user) return { props: { initialSession: null, user: null } };

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

export default function Home({ user }) {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen m-auto mb-10 overflow-hidden">
      <AboutChenkster user={user} />
    </div>
  );
}
