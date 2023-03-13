export const uploadTotalMessages = async (userId, toUserId, supabase) => {
  const { data, error } = await supabase.from('total_messages').insert({
    messages: 1,
    user_id: userId,
    to_user_id: toUserId,
  });

  return { data, error };
};
