import { supabase } from '@/supabaseClient';

export const getUsersAdmin = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id,description,language,location,avatar,first_name,last_name,username,role,user_id',
    )
    .eq('role', 'admin');

  return { data, error };
};
