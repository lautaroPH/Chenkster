export const deleteSavedItinerary = async (userId, itineraryId, supabase) => {
  const { data, error } = await supabase
    .from('saved_itineraries')
    .delete()
    .match({ itinerary: itineraryId, user_id: userId });

  return { data, error };
};
