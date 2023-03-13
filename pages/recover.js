import Layout from '@/components/Layout';
import EyeSlashSvg from '@/components/Svg/EyeSlashSvg';
import EyeSvg from '@/components/Svg/EyeSvg';
import { newPassword } from '@/services/auth/newPassword';
import { recoverPassword } from '@/services/auth/recoverPassword';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

export default function Recover() {
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: dataRecover, error: errorRecover } = await recoverPassword(
      email,
      supabase,
    );
    const { data, error } = await newPassword(email, password, supabase);

    setLoading(false);
    if (errorRecover) {
      setError({ submit: errorRecover.message });
      return;
    }
    if (error) {
      setError({ submit: error.message });
      return;
    }

    router.push('/login');
  };

  return (
    <Layout url={'/login'} title="Recover password" notShow={true}>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center justify-center mt-12 w-96"
      >
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        />
        <div className="relative w-full">
          <input
            type={showFirstPassword ? 'text' : 'password'}
            name="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose your password new password"
            className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          />
          <div
            onClick={() => setShowFirstPassword(!showFirstPassword)}
            className="absolute top-[14px] right-4 text-gray-500"
          >
            {showFirstPassword ? <EyeSvg /> : <EyeSlashSvg />}
          </div>
        </div>
        <p className="mb-3 text-red-600">{error?.submit}</p>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 font-semibold text-center text-white rounded-lg opacity-90 background-gradient font-poppins"
        >
          New password
        </button>
      </form>{' '}
    </Layout>
  );
}
