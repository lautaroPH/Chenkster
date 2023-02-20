import ButtonLoginProvider from '@/components/ButtonLoginProvider';
import FormRegister from '@/components/FormRegister';
import Layout from '@/components/Layout';
import LineSeparate from '@/components/LineSeparate';
import FacebookSvg from '@/components/Svg/FacebookSvg';
import GoogleSvg from '@/components/Svg/GoogleSvg';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';

export default function Register() {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push(`/edit/profile/${user.user_metadata.username}`);
  }

  return (
    <>
      {!user && (
        <Layout title="Chenkster Sign Up">
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
      )}
    </>
  );
}
