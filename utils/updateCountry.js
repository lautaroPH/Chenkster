export const updateCountry = async (
  title,
  supabase,
  flagPath,
  bgImagePath,
  userId,
  countryId,
) => {
  const { data, error } = await supabase
    .from('countries')
    .update([
      {
        title,
        flag: flagPath,
        bg_image: bgImagePath,
        user_id: userId,
        created_at: new Date(),
      },
    ])
    .eq('id', countryId);

  return { country: data, err: error };
};
