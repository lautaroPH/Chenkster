export const removeImage = async (path, supabase, storage) => {
  const { data, error } = await supabase.storage.from(storage).remove([path]);

  return { data, error };
};
