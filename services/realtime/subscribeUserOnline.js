export const subscribeUserOnline = (channel) => {
  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({
        online_at: new Date().toISOString(),
      });
    } else if (status === 'UNSUBSCRIBED') {
      await channel.untrack();
    }
  });
};
