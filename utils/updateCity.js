export const updateCity = async (formData, supabase, image, userId, title) => {
  const { data, error } = await supabase
    .from('cities')
    .update([
      {
        ...formData,
        image,
        user_id: userId,
        created_at: new Date(),
      },
    ])
    .eq('title', title);

  return { city: data, err: error };
};
