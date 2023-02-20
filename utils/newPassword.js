import { supabase } from '@/supabaseClient';

export const newPassword = async (email, password) => {
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });
  return { data, error };
};
