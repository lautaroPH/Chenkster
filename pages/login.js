import ButtonLoginProvider from '@/components/ButtonLoginProvider';
import Layout from '@/components/Layout';
import LineSeparate from '@/components/LineSeparate';
import LoginForm from '@/components/LoginForm';
import FacebookSvg from '@/components/Svg/FacebookSvg';
import GoogleSvg from '@/components/Svg/GoogleSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

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
    <Layout title="Chenkster Sign Up" notShow={true}>
      <LoginForm />

      <LineSeparate />

      <div>
        <ButtonLoginProvider
          Icon={FacebookSvg}
          text="Login with Facebook"
          provider="facebook"
          colorStyles={'bg-[#039be5] text-white'}
        />
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
