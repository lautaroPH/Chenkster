import { supabase } from '@/supabaseClient';

export const getTotalMessage = async (userId, toUserId) => {
  const { data, error } = await supabase
    .from('total_messages')
    .select('messages')
    .eq('user_id', userId)
    .eq('to_user_id', toUserId)
    .single();

  return { totalMessages: data, errorMessage: error };
};
