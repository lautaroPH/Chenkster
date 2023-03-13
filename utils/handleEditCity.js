import { correctFile } from './correctFile';
import { moveImage } from './moveImage';
import { removeImage } from './removeImage';
import { updateCity } from './updateCity';
import { uploadImage } from './uploadImage';

export const handleEditCity = async (
  formData,
  cityData,
  handleError,
  loadingToastId,
  supabase,
  timestamp,
  userId,
) => {
  const imageCorrect = correctFile(
    formData?.image[0]?.type,
    formData?.image[0]?.size,
  );

  let imagePath = cityData.image;

  if (!formData.title || !formData.description || !formData.country_id)
    return handleError('Please fill all the fields', loadingToastId);

  if (formData.image && !imageCorrect)
    return handleError(
      'File type is not supported or file size is too large for image',
      loadingToastId,
    );

  if (formData.title !== cityData.title && !formData.image) {
    const { data, error } = await moveImage(
      `${cityData.title}/image`,
      `${formData.title}/image`,
      'cities',
      supabase,
    );

    if (error) return handleError(error.message, loadingToastId);

    imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/public/${formData.title}/image?${timestamp}`;
  } else if (formData.image) {
    const { error } = await removeImage(
      `public/${cityData.title}/image`,
      supabase,
      'cities',
    );

    if (error) return handleError(error.message, loadingToastId);

    const { dataImage, errorImage } = await uploadImage(
      formData.image[0],
      `image`,
      formData.title,
      supabase,
      'cities',
    );

    if (errorImage) return handleError(errorImage.message, loadingToastId);

    imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/public/${formData.title}/image?${timestamp}`;
  }
  const { country, err } = await updateCity(
    formData,
    supabase,
    imagePath,
    userId,
    cityData.title,
  );

  if (err) {
    await removeImage(`public/${formData.title}/image`, supabase, 'cities');

    handleError(err.message, loadingToastId);
    return;
  }

  return true;
};
