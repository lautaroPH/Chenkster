export const uploadMessage = async (
  message,
  both_users,
  username,
  room,
  supabase,
) => {
  const { data, error } = await supabase.from('messages').insert({
    content: message,
    username: username,
    to_username: room,
    both_users,
  });

  return { data, error };
};
