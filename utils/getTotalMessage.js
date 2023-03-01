import { supabase } from '@/supabaseClient';

export const getTotalMessage = async (username, to_username) => {
  const { data, error } = await supabase
    .from('total_messages')
    .select('messages')
    .eq('username', username)
    .eq('to_username', to_username);
  return { totalMessages: data, errorMessage: error };
};
