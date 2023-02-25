export const registerWithEmail = async (email, password, supabase) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/edit/profile`,
      data: {
        role: 'user',
      },
    },
  });

  return { data, error };
};
