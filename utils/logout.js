export const logout = async (supabase) => {
  const { error } = await supabase.auth.signOut();
console.log(error);
  return { error };
};
