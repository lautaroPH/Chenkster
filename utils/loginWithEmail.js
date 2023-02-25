export const loginWithEmail = async (email, password, supabase) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      redirectTo: 'http://localhost:3000/welcome',
      data: {
        role: 'user',
      },
    },
  });

  return { data, error };
};
