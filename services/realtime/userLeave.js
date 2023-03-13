export const userLeave = (channel, resetMessages) => {
  channel.on('presence', { event: 'leave' }, () => {
    resetMessages();
  });
};
