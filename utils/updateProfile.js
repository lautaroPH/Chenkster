import { supabase } from '@/supabaseClient';

export const updateProfile = async (dataProfile, imagePath, userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .update([
      {
        ...dataProfile,
        avatar_url: imagePath,
      },
    ])
    .eq('user_id', userId);

  return {
    dataProfile: data,
    errorProfile: error,
  };
};
