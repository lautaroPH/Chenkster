export const uploadCity = async (formData, supabase, image, userId) => {
  const { data, error } = await supabase.from('cities').insert([
    {
      ...formData,
      image,
      user_id: userId,
    },
  ]);

  return { city: data, err: error };
};
