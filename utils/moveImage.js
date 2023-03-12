export const moveImage = async (prevPath, nextPath, tableName, supabase) => {
  const { data, error } = await supabase.storage
    .from(tableName)
    .move(`public/${prevPath}`, `public/${nextPath}`);

  return { data, error };
};
