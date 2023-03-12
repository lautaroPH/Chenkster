export const updateTotalMessages = async (
  userId,
  toUserId,
  messages,
  supabase,
) => {
  const { data, error } = await supabase
    .from('total_messages')
    .update({
      messages: messages + 1,
      created_at: new Date(),
    })
    .eq('user_id', userId)
    .eq('to_user_id', toUserId);

  return { data, error };
};
