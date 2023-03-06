export const updateOrder = async (id, order, supabase) => {
  const { data, error } = await supabase
    .from('saved_itineraries')
    .update({
      order,
    })
    .eq('id', id);

  return { data, error };
};
