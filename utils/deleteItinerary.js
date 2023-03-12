import { removeImage } from './removeImage';

export const deleteItinerary = async (title, supabase) => {
  await removeImage(`public/${title}/front_image`, supabase, 'itineraries');
  await removeImage(`public/${title}/detail_image`, supabase, 'itineraries');

  const { data, error } = await supabase
    .from('itineraries')
    .delete()
    .eq('title', title);

  return { data, error };
};
