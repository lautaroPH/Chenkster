import { supabase } from '@/supabaseClient';

export const getCity = async (city) => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('title', city)
    .single();

  return { city: data, err: error };
};
