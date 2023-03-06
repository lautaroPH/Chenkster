import { supabase } from '@/supabaseClient';

export const getSavedItineraries = async (userId, title) => {
  const { data: itinerarySaved, error: itinerarySavedError } = await supabase
    .from('saved_itineraries')
    .select('id')
    .eq('user_id', userId)
    .eq('itinerary_title', title);

  return { itinerarySaved, itinerarySavedError };
};
