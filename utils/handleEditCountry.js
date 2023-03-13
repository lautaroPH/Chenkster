import { correctFile } from './correctFile';
import { moveImage } from './moveImage';
import { removeImage } from './removeImage';
import { updateCountry } from './updateCountry';
import { uploadImage } from './uploadImage';

export const handleEditCountry = async (
  countryData,
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

  let flagPath = countryData.flag;
  let bgImagePath = countryData.bg_image;

  if (!formData.country)
    return handleError('Please fill all the fields', loadingToastId);

  if (formData.flag && !flagCorrect)
    return handleError(
      'File type is not supported or file size is too large for flag',
      loadingToastId,
    );

  if (formData.bg_image && !bgImageCorrect)
    return handleError(
      'File type is not supported or file size is too large for background image',
      loadingToastId,
    );

  if (formData.country !== countryData.title && !formData.flag) {
    const { data, error } = await moveImage(
      `${countryData.title}/flag`,
      `${formData.country}/flag`,
      'countries',
      supabase,
    );

    if (error) return handleError(error.message, loadingToastId);

    flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/flag?${timestamp}`;
  } else if (formData.flag) {
    const { error } = await removeImage(
      `public/${countryData.title}/flag`,
      supabase,
      'countries',
    );

    if (error) return handleError(error.message, loadingToastId);

    const { dataImage, errorImage } = await uploadImage(
      formData.flag[0],
      `flag`,
      formData.country,
      supabase,
      'countries',
    );

    if (errorImage) return handleError(errorImage.message, loadingToastId);

    flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/flag?${timestamp}`;
  }

  if (formData.country !== countryData.title && !formData.bg_image) {
    const { data, error } = await moveImage(
      `${countryData.title}/bg_image`,
      `${formData.country}/bg_image`,
      'countries',
      supabase,
    );

    if (error) return handleError(error.message, loadingToastId);

    bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/bg_image?${timestamp}`;
  } else if (formData.bg_image) {
    const { error } = await removeImage(
      `public/${countryData.title}/bg_image`,
      supabase,
      'countries',
    );
    if (error) return handleError(error.message, loadingToastId);

    const { dataImage, errorImage } = await uploadImage(
      formData.bg_image[0],
      `bg_image`,
      formData.country,
      supabase,
      'countries',
    );

    if (errorImage) return handleError(errorImage.message, loadingToastId);

    bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/bg_image?${timestamp}`;
  }

  const { country, err } = await updateCountry(
    formData.country,
    supabase,
    flagPath,
    bgImagePath,
    userId,
    countryData.id,
  );

  if (err) {
    await removeImage(
      `public/${formData.country}/bg_image`,
      supabase,
      'countries',
    );

    await removeImage(`public/${formData.country}/flag`, supabase, 'countries');

    return handleError(err.message, loadingToastId);
  }

  return true;
};
