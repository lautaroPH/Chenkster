import { removeImage } from './removeImage';

export const deleteItinerary = async (title, supabase) => {
  const { data: itinerarySaved } = await supabase
    .from('saved_itineraries')
    .select('id')
    .eq('itinerary_title', title)
    .single();

  if (itinerarySaved) {
    await supabase
      .from('saved_itineraries')
      .delete()
      .eq('id', itinerarySaved.id);
  }

  await removeImage(`public/${title}/image`, supabase, 'itineraries');

  const { data, error } = await supabase
    .from('itineraries')
    .delete()
    .eq('title', title);

  return { data, error };
};
