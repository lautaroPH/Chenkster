import ButtonLoginProvider from '@/components/ButtonLoginProvider';
import FormRegister from '@/components/FormRegister';
import Layout from '@/components/Layout';
import LineSeparate from '@/components/LineSeparate';
import FacebookSvg from '@/components/Svg/FacebookSvg';
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
      destination: '/edit/profile',
      permanent: false,
    },
  };
};

export default function Register() {
  return (
    <Layout title="Chenkster Sign Up" notShow={true}>
      <Head>
        <title>Chenkster - Sign Up</title>
        <meta
          name="description"
          content="Sign Up to Chenkster and start planning your next trip"
        />
      </Head>
      <FormRegister />

      <LineSeparate />

      <div>
        <ButtonLoginProvider
          Icon={GoogleSvg}
          text="Sign Up with Google"
          provider="google"
          colorStyles={'text-gray-600 bg-white bg-opacity-50'}
        />
      </div>
    </Layout>
  );
}
