import { supabase } from '@/supabaseClient';
import { getUserProfile } from './getUserProfile';

export const getTotalMessagesRealtime = (
  channel,
  setMessages,
  messages,
  toUserId,
) => {
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
        const { data } = await getUserProfile(payload.new.username);
        setMessages([
          {
            ...payload.new,
            username: { ...data },
          },
          ...messages,
        ]);
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
        const newMessages = messages.map((message) => {
          if (message.id === payload.new.id) {
            return {
              ...payload.new,
              username: { ...message.username },
            };
          }
          return message;
        });
        setMessages(newMessages);
      },
    )
    .subscribe();

  return channelSupabase;
};
