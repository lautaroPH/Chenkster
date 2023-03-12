import { supabase } from '@/supabaseClient';

export const getItinerary = async (title) => {
  const { data: itineraryData, error } = await supabase
    .from('itineraries')
    .select('*, user_id (first_name), city (*), country (*)')
    .eq('title', title)
    .single();

  return { itineraryData, err: error };
};
