export const loginWithProvider = async (provider, supabase) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:3000/welcome',
      data: {
        role: 'user',
      },
    },
    data: {
      role: 'user',
    },
  });

  return { data, error };
};
