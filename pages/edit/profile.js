import Layout from '@/components/Layout';
import useSession from '@/hooks/useSession';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import UserAvatar from '@/components/EditProfile/UserAvatar';
import LabelProfile from '@/components/EditProfile/LabelProfile';
import ButtonSave from '@/components/EditProfile/ButtonSave';
import DataAddNew from '@/components/EditProfile/DataAddNew';
import { uploadImage } from '@/utils/uploadImage';
import { updateUser } from '@/utils/updateUser';
import { removeImage } from '@/utils/removeImage';
import { uploadProfile } from '@/utils/uploadProfile';
import { updateProfile } from '@/utils/updateProfile';

export default function Profile() {
  const session = useSession();
  const router = useRouter();
  const user = useUser();
  const profileImgRef = useRef();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    location: [],
    language: [],
    description: '',
    avatar_url: '',
    username: '',
  });

  const [addNewLanguage, setAddNewLanguage] = useState(false);
  const [addNewLocation, setAddNewLocation] = useState(false);
  const [languageInput, setLanguageInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState();
  const [imagePreview, setImagePreview] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const userImage = user?.user_metadata?.avatar_url
    ? user?.user_metadata?.avatar_url
    : '/images/userImg.png';

  if (session === null) {
    router.push(`/login`);
  }

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        phone: user.user_metadata?.phone || '',
        location: user.user_metadata?.location || [],
        language: user.user_metadata?.language || [],
        description: user.user_metadata?.description || '',
        avatar_url: user.user_metadata?.avatar_url || '',
        username: user.user_metadata?.username || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const userFirstName = user.user_metadata?.first_name || '';

    if (!formData.first_name && !formData.last_name && !formData.description)
      return handleError('Please fill in the required fields');

    if (avatar && avatar.length > 0) {
      const allowedExtensions = /(.jpg|.jpeg|.png|.webp)$/i;

      const avatarName = profileImgRef.current.value?.split('\\')[2];

      if (!allowedExtensions.exec(avatar[0].type) && avatar[0].size > 700000)
        return handleError(
          'File type is not supported or file size is too large',
        );

      if (formData.avatar_url) {
        const { data, error } = await removeImage(
          `public/${formData.username}/${formData.avatar_url
            .split('/')
            .at(-1)}`,
        );

        if (error) return handleError(error.message);
      }

      const { dataImage, errorImage } = await uploadImage(
        avatar[0],
        avatarName,
        formData.username,
      );

      if (errorImage) return handleError(errorImage.message);

      const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/avatars/${dataImage.path}`;

      const { dataProfile, errorProfile } = userFirstName
        ? await updateProfile(formData, imagePath, user.id)
        : await uploadProfile(formData, imagePath, user.id);

      if (errorProfile) {
        await removeImage(dataImage.path);
        handleError(
          errorProfile.code === '23505'
            ? 'Username already exists'
            : errorProfile.message,
        );
        return;
      }

      const { data, error } = await updateUser(formData, imagePath);

      setLoading(false);
      if (error) {
        handleError(error.message);
        return;
      }

      router.push(`/profile/${formData.username}`);
      return;
    }

    const { dataProfile, errorProfile } = userFirstName
      ? await updateProfile(formData, formData.avatar_url, user.id)
      : await uploadProfile(formData, formData.avatar_url, user.id);

    if (errorProfile)
      return handleError(
        errorProfile.code === '23505'
          ? 'Username already exists'
          : errorProfile.message,
      );

    const { data, error } = await updateUser(formData, formData.avatar_url);

    setLoading(false);
    if (error) return handleError(error.message);
    router.push(`/profile/${formData.username}`);
  };

  const handleClickLang = () => {
    setLanguageInput('');
    setAddNewLanguage(true);
    if (!languageInput) return;
    setFormData({
      ...formData,
      language: [...formData.language, languageInput],
    });
    setAddNewLanguage(false);
  };

  const handleClickLoc = () => {
    setLocationInput('');
    setAddNewLocation(true);
    if (!locationInput) return;
    setFormData({
      ...formData,
      location: [...formData.location, locationInput],
    });
    setAddNewLocation(false);
  };

  const removeLanguage = (index) => {
    const newLanguage = formData.language.filter((item, i) => i !== index);
    setFormData({
      ...formData,
      language: newLanguage,
    });
  };

  const removeLocation = (index) => {
    const newLocation = formData.location.filter((item, i) => i !== index);
    setFormData({
      ...formData,
      location: newLocation,
    });
  };

  const uploadImagePreview = async (e) => {
    setAvatar(e.target.files);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImagePreview(readerEvent.target.result);
    };
  };

  const handleError = (error) => {
    setLoading(false);
    setError(error);
  };

  console.log(formData);

  return (
    <>
      {user && (
        <Layout title="Create profile">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-5 mt-8 w-96"
          >
            <input
              onChange={uploadImagePreview}
              type="file"
              hidden
              name="profileImg"
              ref={profileImgRef}
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
            <UserAvatar
              imagePreview={imagePreview}
              userImage={userImage}
              profileImgRef={profileImgRef}
            />
            <div className="flex w-full gap-5">
              <div className="flex flex-col w-1/2">
                <LabelProfile title={'First name'} htmlFor={'first_name'} />
                <input
                  name="first_name"
                  className="px-2 py-2 text-sm font-medium bg-transparent border border-gray-300 rounded-lg placeholder:font-lato font-lato"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex flex-col w-1/2">
                <LabelProfile title={'Last name'} htmlFor={'last_name'} />
                <input
                  name="last_name"
                  className="px-2 py-2 text-sm font-medium bg-transparent border border-gray-300 rounded-lg placeholder:font-lato font-lato"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <LabelProfile title={'Description'} htmlFor={'description'} />
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="px-2 py-2 text-sm font-medium bg-transparent border border-gray-300 rounded-lg resize-none placeholder:font-lato font-lato"
                placeholder="Describe yourself and what are you passionate about!"
                required
              />
            </div>
            <div className="flex w-full gap-5">
              <div className="flex flex-col w-1/2">
                <LabelProfile title={'Username'} htmlFor={'username'} />
                <input
                  name="username"
                  className="px-2 py-2 text-sm font-medium bg-transparent border border-gray-300 rounded-lg placeholder:font-lato font-lato"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="seshifer"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <LabelProfile title={'Phone'} htmlFor={'phone'} />
                <input
                  name="phone"
                  className="px-2 py-2 text-sm font-medium bg-transparent border border-gray-300 rounded-lg placeholder:font-lato font-lato"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 634 463 743"
                />
              </div>
            </div>
            <DataAddNew
              data={formData.language}
              handleClick={handleClickLang}
              addNew={addNewLanguage}
              title={'Languages'}
              removeData={removeLanguage}
              handleChange={(e) => setLanguageInput(e.target.value)}
              handleClickInput={() => setAddNewLanguage(false)}
              handleKeyDown={handleClickLang}
            />
            <DataAddNew
              data={formData.location}
              handleClick={handleClickLoc}
              addNew={addNewLocation}
              title={'Locations'}
              removeData={removeLocation}
              handleChange={(e) => setLocationInput(e.target.value)}
              handleClickInput={() => setAddNewLocation(false)}
              handleKeyDown={handleClickLoc}
            />
            {error && <p className="mt-2 text-center text-red-600">{error}</p>}
            <ButtonSave
              disabled={
                loading ||
                !formData.first_name ||
                !formData.last_name ||
                !formData.description
              }
            />
          </form>
        </Layout>
      )}
    </>
  );
}
