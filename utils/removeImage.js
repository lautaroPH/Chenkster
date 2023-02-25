export const removeImage = async (path, supabase) => {
  const { data, error } = await supabase.storage.from('avatars').remove([path]);

  return { data, error };
};
