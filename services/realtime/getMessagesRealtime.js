import { getUserProfileById } from '../get/getUserProfileById';

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
        const { data } = await getUserProfileById(payload.new.user_id);
        const newData = {
          ...payload.new,
          user_id: data,
        };
        setNewData(newData);
        if (room !== payload.new.user_id || !showScrollButton) {
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
