export const deleteSavedItinerary = async (userId, title, supabase) => {
  const { data, error } = await supabase
    .from('saved_itineraries')
    .delete()
    .match({ itinerary_title: title, user_id: userId });

  return { data, error };
};
