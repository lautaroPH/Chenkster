import { supabase } from '@/supabaseClient';

export const getCountries = async () => {
  const { data, error } = await supabase.from('countries').select('id,title');

  return { countries: data, err: error };
};
