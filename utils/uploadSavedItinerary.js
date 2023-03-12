export const uploadSavedItinerary = async (
  userId,
  itineraryId,
  country,
  city,
  supabase,
) => {
  const { data, error } = await supabase
    .from('saved_itineraries')
    .insert([{ itinerary: itineraryId, user_id: userId, country, city }]);

  return { data, error };
};
