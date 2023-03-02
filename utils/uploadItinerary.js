export const uploadItinerary = async (
  supabase,
  userId,
  dataItinerary,
  image,
) => {
  const categories = dataItinerary.categories.map((category) => category.title);

  const { data, error } = await supabase.from('itineraries').insert([
    {
      ...dataItinerary,
      categories,
      image,
      user_id: userId,
    },
  ]);

  return { itinerary: data, err: error };
};
