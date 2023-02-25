export const uploadCategory = async (title, supabase, image, userId) => {
  const { data, error } = await supabase.from('categories').insert([
    {
      title,
      image,
      user_id: userId,
    },
  ]);

  return { category: data, err: error };
};
