import { supabase } from '@/supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select('id,title');

  return { categories: data, err: error };
};
