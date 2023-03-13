import { supabase } from '@/supabaseClient';

export const getCountry = async (country) => {
  const { data: countryData, error } = await supabase
    .from('countries')
    .select('*')
    .eq('title', country)
    .single();

  return { countryData, err: error };
};
