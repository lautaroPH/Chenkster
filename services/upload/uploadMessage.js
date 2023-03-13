export const uploadMessage = async (
  message,
  both_users,
  userId,
  toUserId,
  supabase,
) => {
  const { data, error } = await supabase.from('messages').insert({
    content: message,
    user_id: userId,
    to_user_id: toUserId,
    both_users,
  });

  return { data, error };
};
