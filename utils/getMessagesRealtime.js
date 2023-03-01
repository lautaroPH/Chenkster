import { getUserProfile } from './getUserProfile';

export const getMessagesRealtime = (
  room,
  both_users,
  setNewData,
  increment,
  supabase,
  resetNumber,
  showScrollButton,
  endRef,
) => {
  const messages = supabase
    .channel(`${room}-${both_users}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: `messages`,
        filter: `both_users=eq.${both_users}`,
      },
      async (payload) => {
        const newMessage = await getUserProfile(payload.new.username);
        const newData = {
          ...payload.new,
          username: newMessage.data[0],
        };
        setNewData(newData);

        if (room !== payload.new.username || !showScrollButton) {
          setTimeout(() => {
            endRef.current.scrollTo(0, endRef.current.scrollHeight);
          }, 400);
          resetNumber();
        } else {
          increment(1);
        }
      },
    )
    .subscribe();

  return messages;
};
