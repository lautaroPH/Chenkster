export const uploadCountry = async (title, supabase, flagPath, bgImagePath) => {
  const { data, error } = await supabase.from('countries').insert([
    {
      title,
      flag: flagPath,
      bg_image: bgImagePath,
    },
  ]);

  return { country: data, err: error };
};
