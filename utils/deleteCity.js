import { removeImage } from './removeImage';

export const deleteCity = async (title, supabase) => {
  await removeImage(`public/${title}/image`, supabase, 'itineraries');

  await supabase.from('itineraries').delete().eq('city', title);

  const { data, error } = await supabase
    .from('cities')
    .delete()
    .eq('title', title);

  return { data, error };
};
