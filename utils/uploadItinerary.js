export const uploadItinerary = async (
  supabase,
  userId,
  dataItinerary,
  image,
) => {
  const { data, error } = await supabase.from('itineraries').insert([
    {
      ...dataItinerary,
      image,
      user_id: userId,
    },
  ]);

  return { itinerary: data, err: error };
};
