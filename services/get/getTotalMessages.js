import { supabase } from '@/supabaseClient';

export const getTotalMessages = async (toUserId) => {
  const { data, error } = await supabase
    .from('total_messages')
    .select(
      'id,created_at,messages,user_id (avatar,first_name,last_name,user_id,username)',
    )
    .eq('to_user_id', toUserId)
    .order('created_at', { ascending: false });
  return { messages: data, errorMessage: error };
};
