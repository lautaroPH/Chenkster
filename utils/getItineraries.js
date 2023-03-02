import { supabase } from '@/supabaseClient';

export const getItineraries = async (city, country, category) => {
  const { data: places, error } = await supabase
    .from('itineraries')
    .select('*')
    .contains('categories', [category])
    .eq('city', city)
    .eq('country', country)
    .limit(3)
    .order('created_at', { ascending: true });

  return { places, error };
};
