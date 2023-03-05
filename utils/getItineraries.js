import { supabase } from '@/supabaseClient';

export const getItineraries = async (city, category) => {
  const { data: places, error } = await supabase
    .from('itineraries')
    .select('*')
    .contains('categories', [category])
    .eq('city', city)
    .limit(3);

  return { places, error };
};
