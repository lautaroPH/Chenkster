import { supabase } from '@/supabaseClient';

export const searchCountry = async (search) => {
  const { data, error } = await supabase
    .from('countries')
    .select('id,title,flag')
    .ilike('title', `%${search}%`);

  return { data, error };
};
