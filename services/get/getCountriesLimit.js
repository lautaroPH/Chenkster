import { supabase } from '@/supabaseClient';

export const getCountriesLimit = async () => {
  const { data, error } = await supabase
    .from('countries')
    .select('id,title,flag')
    .limit(4);

  return { countries: data, err: error };
};
