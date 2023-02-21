import { supabase } from '@/supabaseClient';

export const uploadImage = async (file, avatarName, username) => {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`public/${username}/${avatarName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return { dataImage: data, errorImage: error };
};
