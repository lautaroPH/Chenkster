export const uploadSavedItinerary = async (
  userId,
  title,
  country,
  city,
  supabase,
) => {
  const { data, error } = await supabase
    .from('saved_itineraries')
    .insert([{ itinerary_title: title, user_id: userId, country, city }]);

  return { data, error };
};
