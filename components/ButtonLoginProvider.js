import { loginWithProvider } from '@/utils/loginWithProvider';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const ButtonLoginProvider = ({ Icon, text, provider, colorStyles }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleSocialLogin = async (provider) => {
    const { data, error } = await loginWithProvider(provider, supabase);

    if (error) {
      alert(error.message);
      return;
    }
    router.push(`/welcome`);
  };

  return (
    <div className="flex items-center justify-center w-full mt-7">
      <button
        onClick={() => handleSocialLogin(provider)}
        className={`${colorStyles}  flex items-center relative justify-center gap-8 w-96 shadow-md font-lato font-medium text-[14px] text-center rounded-lg opacity-90 drop-shadow-lg py-3`}
      >
        <div className="absolute top-1 left-12">
          <Icon />
        </div>
        {text}
      </button>
    </div>
  );
};

export default ButtonLoginProvider;
