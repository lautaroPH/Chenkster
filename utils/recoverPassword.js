import { supabase } from '@/supabaseClient';

export const recoverPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  return { data, error };
};
