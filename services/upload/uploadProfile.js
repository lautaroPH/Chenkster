export const uploadProfile = async (
  dataProfile,
  imagePath,
  userId,
  supabase,
) => {
  const { data, error } = await supabase.from('profiles').insert([
    {
      ...dataProfile,
      avatar: imagePath
        ? imagePath
        : 'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
      user_id: userId,
    },
  ]);

  return {
    dataProfile: data,
    errorProfile: error,
  };
};
