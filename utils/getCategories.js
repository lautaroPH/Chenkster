import { supabase } from '@/supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id,title,sub_categories');

  return { categories: data, err: error };
};
