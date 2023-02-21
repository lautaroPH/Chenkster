import { supabase } from '@/supabaseClient';

export const removeImage = async (path) => {
  const { data, error } = await supabase.storage.from('avatars').remove([path]);

  return { data, error };
};
