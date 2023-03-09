export const resetTotalMessages = async (username, toUsername, supabase) => {
  const { data, error } = await supabase
    .from('total_messages')
    .update({ messages: 0 })
    .eq('username', username)
    .eq('to_username', toUsername);
  return { messages: data, errorMessage: error };
};
