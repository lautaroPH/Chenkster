export const updateItinerary = async (
  supabase,
  userId,
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
        user_id: userId,
      },
    ])
    .eq('id', id);

  return { itinerary: data, err: error };
};
