export const deleteTotalMessages = async (username, toUsername, supabase) => {
  const { data, error } = await supabase
    .from('total_messages')
    .delete()
    .eq('username', username)
    .eq('to_username', toUsername);
  return { messages: data, errorMessage: error };
};