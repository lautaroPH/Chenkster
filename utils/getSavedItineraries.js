import { supabase } from '@/supabaseClient';

export const getSavedItineraries = async (userId, itineraryId) => {
  const { data: itinerarySaved, error: itinerarySavedError } = await supabase
    .from('saved_itineraries')
    .select('id')
    .eq('user_id', userId)
    .eq('itinerary', itineraryId);

  return { itinerarySaved, itinerarySavedError };
};
