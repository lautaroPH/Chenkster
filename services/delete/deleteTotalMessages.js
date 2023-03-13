export const resetTotalMessages = async (userId, toUserId, supabase) => {
  const { data, error } = await supabase
    .from('total_messages')
    .update({ messages: 0 })
    .eq('user_id', userId)
    .eq('to_user_id', toUserId);
  return { messages: data, errorMessage: error };
};
