export const uploadCategory = async (
  title,
  supabase,
  image,
  userId,
  subCategories,
) => {
  const { data, error } = await supabase.from('categories').insert([
    {
      title,
      image,
      user_id: userId,
      sub_categories: subCategories,
    },
  ]);

  return { category: data, err: error };
};
