export const uploadCity = async (
  title,
  supabase,
  description,
  image,
  userId,
  country,
) => {
  const { data, error } = await supabase.from('cities').insert([
    {
      title,
      description,
      image,
      user_id: userId,
      country,
    },
  ]);

  return { city: data, err: error };
};
