import { removeImage } from './removeImage';

export const deleteCity = async (title, supabase) => {
  const { data: itinerary } = await supabase
    .from('itineraries')
    .select('title')
    .eq('city', title)
    .single();

  if (itinerary) {
    await removeImage(
      `public/${itinerary.title}/image`,
      supabase,
      'itineraries',
    );

    await supabase.from('itineraries').delete().eq('city', title);
  }

  await removeImage(`public/${title}/image`, supabase, 'cities');

  const { data, error } = await supabase
    .from('cities')
    .delete()
    .eq('title', title);

  return { data, error };
};
