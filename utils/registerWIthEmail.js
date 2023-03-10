import { getUserProfile } from './getUserProfile';
import { uploadProfile } from './uploadProfile';

export const registerWithEmail = async (
  email,
  password,
  username,
  supabase,
) => {
  const { data: user } = await getUserProfile(username);

  if (user) {
    return {
      data: null,
      error: {
        message: 'Username already exists',
      },
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/edit/profile`,
      data: {
        role: 'user',
        avatar:
          'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
        first_name: 'Guest',
        last_name: 'User',
        username,
      },
    },
  });

  await uploadProfile(
    {
      role: data.user.user_metadata.role,
      first_name: data.user.user_metadata.first_name,
      last_name: data.user.user_metadata.last_name,
      username: data.user.user_metadata.username,
      description: '',
      location: [],
      language: [],
    },
    'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
    data.user.id,
    supabase,
  );

  return { data, error };
};
