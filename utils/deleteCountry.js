import { removeImage } from './removeImage';

export const deleteCountry = async (title, supabase) => {
  const { data: itinerary } = await supabase
    .from('itineraries')
    .select('title')
    .eq('country', title)
    .single();

  if (itinerary) {
    await removeImage(
      `public/${itinerary.title}/image`,
      supabase,
      'itineraries',
    );

    await supabase.from('itineraries').delete().eq('country', title);
  }

  const { data: city } = await supabase
    .from('cities')
    .select('title')
    .eq('country', title)
    .single();

  if (city) {
    await removeImage(`public/${city.title}/image`, supabase, 'cities');

    await supabase.from('cities').delete().eq('country', title);
  }

  const { data: itinerarySaved } = await supabase
    .from('saved_itineraries')
    .select('id')
    .eq('country', title)
    .single();

  if (itinerarySaved) {
    await supabase
      .from('saved_itineraries')
      .delete()
      .eq('id', itinerarySaved.id);
  }

  await removeImage(`public/${title}/flag`, supabase, 'countries');
  await removeImage(`public/${title}/bg_image`, supabase, 'countries');

  const { data, error } = await supabase
    .from('countries')
    .delete()
    .eq('title', title);

  return { data, error };
};
