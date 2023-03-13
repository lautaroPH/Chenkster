import { supabase } from '@/supabaseClient';

export const getMessages = async (bothUsers) => {
  const { data, error } = await supabase
    .from('messages')
    .select(
      '*,to_user_id (avatar,first_name,last_name,user_id,role),user_id (avatar,first_name,last_name,user_id,username,role)',
    )
    .eq('both_users', bothUsers)
    .order('created_at', { ascending: true });

  return { messages: data, errorMessage: error };
};
