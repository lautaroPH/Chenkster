import { supabase } from '@/supabaseClient';

export const registerWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
};
