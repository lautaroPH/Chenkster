import { supabase } from '@/supabaseClient';

export const getUserProfile = async (username) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'description,language,location,avatar_url,first_name,last_name,username',
    )
    .eq('username', username);

  return { data, error };
};
