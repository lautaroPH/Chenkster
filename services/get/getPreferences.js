import { supabase } from '@/supabaseClient';

export const getPreferences = async (title) => {
  const { data, error } = await supabase
    .from('categories')
    .select('sub_categories')
    .eq('title', title)
    .single();

  return { preferences: data.sub_categories, error };
};
