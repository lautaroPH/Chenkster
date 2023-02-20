import { supabase } from '@/supabaseClient';

export const loginWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      redirectTo: 'http://localhost:3000/welcome',
    },
  });

  return { data, error };
};
