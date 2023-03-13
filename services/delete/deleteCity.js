import { removeImage } from './removeImage';

export const deleteCity = async (title, supabase, cityId) => {
  const { data: itinerary } = await supabase
    .from('itineraries')
    .select('title')
    .eq('city', cityId)
    .single();

  if (itinerary) {
    await removeImage(
      `public/${itinerary.title}/front_image`,
      supabase,
      'itineraries',
    );

    await removeImage(
      `public/${itinerary.title}/detail_image`,
      supabase,
      'itineraries',
    );
  }

  await removeImage(`public/${title}/image`, supabase, 'cities');

  const { data, error } = await supabase
    .from('cities')
    .delete()
    .eq('title', title);

  return { data, error };
};
