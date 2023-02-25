export const uploadImage = async (file, avatarName, username, supabase) => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`public/${username}/${avatarName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return { dataImage: data, errorImage: error };
};
