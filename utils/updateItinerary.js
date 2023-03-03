export const updateItinerary = async (
  supabase,
  userId,
  dataItinerary,
  image,
  id,
) => {
  const categories = dataItinerary.categories.map((category) => category.title);

  const { data, error } = await supabase
    .from('itineraries')
    .update([
      {
        ...dataItinerary,
        categories,
        image,
        user_id: userId,
      },
    ])
    .eq('id', id);

  return { itinerary: data, err: error };
};
