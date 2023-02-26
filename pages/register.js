import ButtonLoginProvider from '@/components/ButtonLoginProvider';
import FormRegister from '@/components/FormRegister';
import Layout from '@/components/Layout';
import LineSeparate from '@/components/LineSeparate';
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
      destination: '/edit/profile',
      permanent: false,
    },
  };
};

export default function Register() {
  return (
    <Layout title="Chenkster Sign Up" notShow={true}>
      <FormRegister />

      <LineSeparate />

      <div>
        <ButtonLoginProvider
          Icon={FacebookSvg}
          text="Sign Up with Facebook"
          provider="facebook"
          colorStyles={'bg-[#039be5] text-white'}
        />
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
