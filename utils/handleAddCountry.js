import { correctFile } from './correctFile';
import { removeImage } from './removeImage';
import { uploadCountry } from './uploadCountry';
import { uploadImage } from './uploadImage';

export const handleAddCountry = async (
  formData,
  handleError,
  loadingToastId,
  supabase,
  timestamp,
  userId,
) => {
  const flagCorrect = correctFile(
    formData?.flag[0]?.type,
    formData?.flag[0]?.size,
  );

  const bgImageCorrect = correctFile(
    formData?.bg_image[0]?.type,
    formData?.bg_image[0]?.size,
  );

  if (!formData.country || !formData.flag || !formData.bg_image)
    return handleError('Please fill all the fields', loadingToastId);

  if (!flagCorrect || !bgImageCorrect)
    return handleError(
      'File type is not supported or file size is too large for flag and background image',
      loadingToastId,
    );

  const { dataImage, errorImage } = await uploadImage(
    formData.flag[0],
    `flag`,
    formData.country,
    supabase,
    'countries',
  );

  const { dataImage: data, errorImage: error } = await uploadImage(
    formData.bg_image[0],
    `bg_image`,
    formData.country,
    supabase,
    'countries',
  );

  if (errorImage || error)
    return handleError(error.message || errorImage.message, loadingToastId);

  const flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/${dataImage.path}?${timestamp}`;
  const bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/${data.path}?${timestamp}`;

  const { country, err } = await uploadCountry(
    formData.country,
    supabase,
    flagPath,
    bgImagePath,
    userId,
  );

  if (err) {
    await removeImage(dataImage.path, supabase, 'countries');

    await removeImage(data.path, supabase, 'countries');

    handleError(err.message, loadingToastId);
    return;
  }

  return true;
};
