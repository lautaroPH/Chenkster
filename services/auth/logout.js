export const logout = async (supabase) => {
  const { error } = await supabase.auth.signOut();

  return { error };
};
