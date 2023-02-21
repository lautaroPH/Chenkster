import { supabase } from '@/supabaseClient';

export const updateUser = async (dataUser, path) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...dataUser,
      avatar_url: path,
    },
  });

  return { data, error };
};
