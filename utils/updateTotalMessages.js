export const updateTotalMessages = async (
  username,
  to_username,
  messages,
  supabase,
) => {
  const { data, error } = await supabase
    .from('total_messages')
    .update({
      messages: messages + 1,
      created_at: new Date(),
    })
    .eq('username', username)
    .eq('to_username', to_username);

  return { data, error };
};
