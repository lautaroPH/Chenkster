import { supabase } from '@/supabaseClient';

export const getRandomItineraries = async (
  city,
  preferences,
  category,
  range,
) => {
  let query = supabase
    .from('itineraries')
    .select('*')
    .eq('city', city)
    .range(range - 3, range)
    .limit(3);

  if (preferences.length > 0) {
    query = query.contains('sub_categories', preferences);
  } else {
    query = query.contains('categories', [category]);
  }

  const { data, error } = await query;

  return { itineraries: data, error };
};
