export const userIsOnline = (channel, handleOnline) => {
  channel.on('presence', { event: 'sync' }, () => {
    const { onlineUsers } = channel.presenceState();

    if (onlineUsers && onlineUsers.length >= 2) {
      handleOnline(true);
    } else {
      handleOnline(false);
    }
  });
};
