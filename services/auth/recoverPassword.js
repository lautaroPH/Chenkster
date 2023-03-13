export const recoverPassword = async (email, supabase) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  return { data, error };
};
