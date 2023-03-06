export const updateOrderCity = async (id, order_city, supabase) => {
  const { data, error } = await supabase
    .from('saved_itineraries')
    .update({
      order_city,
    })
    .eq('id', id);

  return { data, error };
};
