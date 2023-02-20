import { supabase } from '@/supabaseClient';

export const loginWithProvider = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider });

  return { data, error };
};
