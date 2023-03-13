import { supabase } from '@/supabaseClient';

export const getLastMessage = (channel, setMessage, toUserId) => {
  const channelSupabase = supabase
    .channel(channel)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: `total_messages`,
        filter: `to_user_id=eq.${toUserId}`,
      },
      async (payload) => {
        setMessage(payload.new);
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: `total_messages`,
        filter: `to_user_id=eq.${toUserId}`,
      },
      (payload) => {
        setMessage(payload.new);
      },
    )
    .subscribe();

  return channelSupabase;
};
