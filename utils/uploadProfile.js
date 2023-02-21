import { supabase } from '@/supabaseClient';

export const uploadProfile = async (dataProfile, imagePath, userId) => {
  const { data, error } = await supabase.from('profiles').insert([
    {
      ...dataProfile,
      avatar_url: imagePath,
      user_id: userId,
    },
  ]);

  return {
    dataProfile: data,
    errorProfile: error,
  };
};
