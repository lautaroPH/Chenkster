import { supabase } from '@/supabaseClient';

export const getCountryCities = async (country) => {
  const { data: cities, error } = await supabase
    .from('cities')
    .select('*, country_id (*)')
    .eq('country_id', country);

  return { cities, error };
};
