import { supabase } from '@/supabaseClient';

export const getItinerariesWithPreferenes = async (
  country,
  city,
  preferences,
  category,
) => {
  let query = supabase
    .from('itineraries')
    .select('*')
    .eq('country', country)
    .eq('city', city)
    .limit(3);

  if (preferences.length > 0) {
    query = query.contains('sub_categories', preferences);
  } else {
    query = query.contains('categories', [category]);
  }

  const { data, error } = await query;

  return { itineraries: data, error };
};
