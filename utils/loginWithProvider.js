import { uuid } from "uuidv4";
import { uploadProfile } from "./uploadProfile";

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
        username: uuid()
      },
    },
    data: {
      role: 'user',
      avatar:
        'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',
      first_name: 'Guest',
      last_name: 'User',
      username: uuid()
    },
  });

  await uploadProfile({
    role: data.user.user_metadata.role,
    first_name: data.user.user_metadata.first_name,
    last_name: data.user.user_metadata.last_name,
    username: data.user.user_metadata.username,
    description: '',
    location: [],
    language: []
  }, 'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1677080765/samples/userImg_oiynrs.png',data.user.id,supabase)

  return { data, error };
};
