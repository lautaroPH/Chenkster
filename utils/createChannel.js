export const createChannel = (both_users, supabase) => {
  const channel = supabase.channel(both_users, {
    config: {
      presence: {
        key: 'onlineUsers',
      },
    },
  });

  return channel;
};
