import { supabase } from '@/supabaseClient';

export const getCities = async () => {
  const { data, error } = await supabase.from('cities').select('id,title');

  return { cities: data, err: error };
};
