import { supabase } from '@/supabaseClient';

export const getUserItineraries = async (userId) => {
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .eq('user_id', userId);

  return { itineraries: data, err: error };
};
