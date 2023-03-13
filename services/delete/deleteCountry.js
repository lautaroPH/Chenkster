import { removeImage } from './removeImage';

export const deleteCountry = async (title, supabase, countryId) => {
  const { data: itinerary } = await supabase
    .from('itineraries')
    .select('title')
    .eq('country', countryId)
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

  const { data: city } = await supabase
    .from('cities')
    .select('title')
    .eq('country', countryId)
    .single();

  if (city) {
    await removeImage(`public/${city.title}/image`, supabase, 'cities');
  }

  await removeImage(`public/${title}/flag`, supabase, 'countries');
  await removeImage(`public/${title}/bg_image`, supabase, 'countries');

  const { data, error } = await supabase
    .from('countries')
    .delete()
    .eq('title', title);

  return { data, error };
};
