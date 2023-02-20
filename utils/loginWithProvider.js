import { supabase } from '@/supabaseClient';

export const loginWithProvider = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:3000/welcome',
    },
  });

  return { data, error };
};
