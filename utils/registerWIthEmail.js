import { supabase } from '@/supabaseClient';

export const registerWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/edit/profile`,
    },
  });

  return { data, error };
};
