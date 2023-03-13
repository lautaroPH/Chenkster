import { supabase } from '@/supabaseClient';
import { getUserProfileById } from '../get/getUserProfileById';

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
        const { data } = await getUserProfileById(payload.new.user_id);
        setMessages([
          {
            ...payload.new,
            user_id: { ...data },
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
              user_id: { ...message.user_id },
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
