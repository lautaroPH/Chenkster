export const loginWithEmail = async (email, password, supabase) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      data: {
        role: 'user',
        avatar:
          'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
        first_name: 'Guest',
        last_name: 'User',
      },
    },
  });
  return { data, error };
};
