import { supabase } from '@/supabaseClient';
import { getUserProfile } from './getUserProfile';

export const getTotalMessagesRealtime = (channel, setMessages, messages) => {
  const channelSupabase = supabase
    .channel(channel)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: `total_messages`,
        filter: `to_username=eq.${channel}`,
      },
      async (payload) => {
        const newMessage = await getUserProfile(payload.new.username);
        setMessages([
          {
            ...payload.new,
            username: { ...newMessage.data[0] },
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
        filter: `to_username=eq.${channel}`,
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
