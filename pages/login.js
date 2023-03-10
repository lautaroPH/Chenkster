import ButtonLoginProvider from '@/components/ButtonLoginProvider';
import Layout from '@/components/Layout';
import LineSeparate from '@/components/LineSeparate';
import LoginForm from '@/components/LoginForm';
import GoogleSvg from '@/components/Svg/GoogleSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      props: {
        initialSession: data.user,
        user: data.user,
      },
    };

  return {
    redirect: {
      destination: '/welcome',
      permanent: false,
    },
  };
};

export default function Login() {
  return (
    <Layout url={'/register'} title="Chenkster Sign in" notShow={true}>
      <Head>
        <title>Chenkster - Sign in</title>
        <meta
          name="description"
          content="Sign in to Chenkster and start planning your next trip"
        />
      </Head>
      <LoginForm />

      <LineSeparate />

      <div>
        <ButtonLoginProvider
          Icon={GoogleSvg}
          text="Login with Google"
          provider="google"
          colorStyles={'text-gray-600 bg-white bg-opacity-50'}
        />
      </div>
    </Layout>
  );
}
