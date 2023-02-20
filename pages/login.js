import ButtonLoginProvider from '@/components/ButtonLoginProvider';
import Layout from '@/components/Layout';
import LineSeparate from '@/components/LineSeparate';
import LoginForm from '@/components/LoginForm';
import FacebookSvg from '@/components/Svg/FacebookSvg';
import GoogleSvg from '@/components/Svg/GoogleSvg';

export default function Login() {
  return (
    <Layout title="Chenkster Sign Up">
      <LoginForm />

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
