export const updateUser = async (dataUser, path, supabase) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...dataUser,
      avatar: path,
      role: 'user',
    },
  });

  return { data, error };
};
