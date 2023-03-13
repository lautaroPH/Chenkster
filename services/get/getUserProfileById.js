import { supabase } from '@/supabaseClient';

export const getUserProfileById = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('avatar,first_name,last_name,user_id')
    .eq('user_id', userId);

  return { data, error };
};
