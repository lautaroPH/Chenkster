import { supabase } from '@/supabaseClient';

export const getMessages = async (toUsername, username) => {
  const { data, error } = await supabase
    .from('messages')
    .select(
      '*,to_username (avatar,first_name,last_name,user_id,role),username (avatar,first_name,last_name,user_id,username,role)',
    )
    .eq('to_username', toUsername)
    .eq('username', username)
    .order('created_at', { ascending: true });

  return { messages: data, errorMessage: error };
};
