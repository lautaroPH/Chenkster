export const updateItinerary = async (
  supabase,
  dataItinerary,
  fronImage,
  detailImage,
  id,
) => {
  const categories = dataItinerary.categories.map((category) => category.title);

  const { data, error } = await supabase
    .from('itineraries')
    .update([
      {
        ...dataItinerary,
        categories,
        front_image: fronImage,
        detail_image: detailImage,
        created_at: new Date(),
        country: dataItinerary.country.id,
        city: dataItinerary.city.id,
      },
    ])
    .eq('id', id);

  return { itinerary: data, err: error };
};
