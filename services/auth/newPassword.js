export const newPassword = async (email, password, supabase) => {
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });
  return { data, error };
};
