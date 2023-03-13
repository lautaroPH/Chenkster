import { correctFile } from './correctFile';
import { removeImage } from './removeImage';
import { uploadCity } from './uploadCity';
import { uploadImage } from './uploadImage';

export const handleAddCity = async (
  formData,
  handleError,
  loadingToastId,
  supabase,
  timestamp,
  userId,
) => {
  if (
    !formData.title ||
    !formData.description ||
    !formData.image ||
    !formData.country_id
  )
    return handleError('Please fill all the fields', loadingToastId);

  const imageCorrect = correctFile(
    formData?.image[0]?.type,
    formData?.image[0]?.size,
  );

  if (!imageCorrect)
    return handleError(
      'File type is not supported or file size is too large for image',
      loadingToastId,
    );

  const { dataImage, errorImage } = await uploadImage(
    formData.image[0],
    `image`,
    formData.title,
    supabase,
    'cities',
  );

  if (errorImage) return handleError(errorImage.message, loadingToastId);

  const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/${dataImage.path}?${timestamp}`;

  const { city, err } = await uploadCity(formData, supabase, imagePath, userId);

  if (err) {
    await removeImage(dataImage.path, supabase, 'cities');

    handleError(err.message, loadingToastId);
    return;
  }
};
