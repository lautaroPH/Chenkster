export const uploadItinerary = async (
  supabase,
  userId,
  dataItinerary,
  frontPath,
  detailPath,
) => {
  const categories = dataItinerary.categories.map((category) => category.title);

  const { data, error } = await supabase.from('itineraries').insert([
    {
      ...dataItinerary,
      categories,
      user_id: userId,
      front_image: frontPath,
      detail_image: detailPath,
      country: dataItinerary.country.id,
      city: dataItinerary.city.id,
    },
  ]);

  return { itinerary: data, err: error };
};
