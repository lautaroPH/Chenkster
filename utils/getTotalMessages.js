import { supabase } from '@/supabaseClient';

export const getTotalMessages = async (username) => {
  const { data, error } = await supabase
    .from('total_messages')
    .select(
      'id,created_at,messages,username (avatar,first_name,last_name,user_id)',
    )
    .eq('to_username', username)
    .order('created_at', { ascending: false });
  return { messages: data, errorMessage: error };
};
