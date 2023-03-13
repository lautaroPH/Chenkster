export const updateProfile = async (
  dataProfile,
  imagePath,
  userId,
  supabase,
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update([
      {
        ...dataProfile,
        avatar: imagePath
          ? imagePath
          : 'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
      },
    ])
    .eq('user_id', userId);

  return {
    dataProfile: data,
    errorProfile: error,
  };
};
