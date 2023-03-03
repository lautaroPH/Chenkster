export const deleteCategory = async (category, supabase) => {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('title', category);

  return { data, error };
};
