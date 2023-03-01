export const uploadTotalMessages = async (username, to_username, supabase) => {
  const { data, error } = await supabase.from('total_messages').insert({
    messages: 1,
    username,
    to_username,
  });

  return { data, error };
};
