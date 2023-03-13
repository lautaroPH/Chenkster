export const uploadImage = async (file, name, title, supabase, storage) => {
  const { data, error } = await supabase.storage
    .from(storage)
    .upload(`public/${title}/${name}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return { dataImage: data, errorImage: error };
};
