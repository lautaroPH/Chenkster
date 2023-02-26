export const loginWithProvider = async (provider, supabase) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:3000/welcome',
      data: {
        role: 'user',
        avatar:
          'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
        first_name: 'Guest',
        last_name: 'User',
      },
    },
    data: {
      role: 'user',
      avatar:
        'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
      first_name: 'Guest',
      last_name: 'User',
    },
  });

  return { data, error };
};
