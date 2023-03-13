import { supabase } from '@/supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');

  return { categories: data, err: error };
};
