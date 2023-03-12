import { supabase } from '@/supabaseClient';

export const getCity = async (city) => {
  const { data, error } = await supabase
    .from('cities')
    .select('id,title')
    .eq('title', city)
    .single();

  return { cities: data, err: error };
};
