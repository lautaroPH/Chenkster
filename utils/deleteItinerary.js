import { removeImage } from './removeImage';

export const deleteItinerary = async (title, supabase) => {
  await removeImage(`public/${title}/image`, supabase, 'itineraries');

  const { data, error } = await supabase
    .from('itineraries')
    .delete()
    .eq('title', title);

  return { data, error };
};
