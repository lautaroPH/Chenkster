export const uploadCountry = async (
  title,
  supabase,
  flagPath,
  bgImagePath,
  userId,
) => {
  const { data, error } = await supabase.from('countries').insert([
    {
      title,
      flag: flagPath,
      bg_image: bgImagePath,
      user_id: userId,
    },
  ]);

  return { country: data, err: error };
};
