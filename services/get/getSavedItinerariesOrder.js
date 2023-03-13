import { supabase } from '@/supabaseClient';

export const getSavedItinerariesOrder = async (userId) => {
  const { data: itinerarySaved, error: itinerarySavedError } = await supabase
    .from('saved_itineraries')
    .select('*, itinerary (*, city (*), country(*) ), city(*), country (*)')
    .eq('user_id', userId)
    .order('order_city', { ascending: true })
    .order('order', { ascending: true })
    .order('created_at', { ascending: true });

  return { itinerarySaved, itinerarySavedError };
};
