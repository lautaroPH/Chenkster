import { supabase } from '@/supabaseClient';

export const getUserProfile = async (username) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'description,language,location,avatar,first_name,last_name,username,role,user_id',
    )
    .eq('username', username);

  return { data, error };
};
