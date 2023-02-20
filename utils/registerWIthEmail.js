import { supabase } from '@/supabaseClient';

export const registerWithEmail = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email,
        username,
      },
      emailRedirectTo: `http://localhost:3000/edit/profile/${username}`,
    },
  });

  return { data, error };
};
