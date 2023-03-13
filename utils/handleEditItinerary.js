import { correctFile } from './correctFile';
import { moveImage } from '../services/update/moveImage';
import { removeImage } from '../services/delete/removeImage';
import { updateItinerary } from '../services/update/updateItinerary';
import { uploadImage } from '../services/upload/uploadImage';

export const handleEditItinerary = async (
  itineraryData,
  formData,
  supabase,
  handleError,
  loadingToastId,
  timestamp,
) => {
  const detailImageCorrect = correctFile(
    formData?.detail_image[0]?.type,
    formData?.detail_image[0]?.size,
  );

  const frontImageCorrect = correctFile(
    formData?.front_image[0]?.type,
    formData?.front_image[0]?.size,
  );

  let frontImage = itineraryData.front_image;
  let detailImage = itineraryData.detail_image;

  if (
    !formData.categories ||
    !formData.city ||
    !formData.description ||
    !formData.title ||
    !formData.budget ||
    !formData.visit_period ||
    !formData.street ||
    !formData.lat ||
    !formData.lng ||
    !formData.sub_categories ||
    !formData.social_media ||
    !formData.map_url ||
    !formData.country
  )
    return handleError('Please fill all the fields', loadingToastId);

  if (formData.front_image && !frontImageCorrect)
    return handleError(
      'File type is not supported or file size is too large for the front image',
      loadingToastId,
    );

  if (formData.detail_image && !detailImageCorrect)
    return handleError(
      'File type is not supported or file size is too large for the detail image',
      loadingToastId,
    );

  if (formData.title !== itineraryData.title && !formData.detail_image) {
    const { data, error } = await moveImage(
      `${itineraryData.title}/detail_image`,
      `${formData.title}/detail_image`,
      'itineraries',
      supabase,
    );

    if (error) return handleError(error.message, loadingToastId);

    detailImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/detail_image?${timestamp}`;
  } else if (formData.detail_image) {
    const { error } = await removeImage(
      `public/${itineraryData.title}/detail_image`,
      supabase,
      'itineraries',
    );

    if (error) return handleError(error.message, loadingToastId);

    const { dataImage, errorImage } = await uploadImage(
      formData.detail_image[0],
      `detail_image`,
      formData.title,
      supabase,
      'itineraries',
    );

    if (errorImage) return handleError(errorImage.message, loadingToastId);

    detailImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/detail_image?${timestamp}`;
  }

  if (formData.title !== itineraryData.title && !formData.front_image) {
    const { data, error } = await moveImage(
      `${itineraryData.title}/front_image`,
      `${formData.title}/front_image`,
      'itineraries',
      supabase,
    );

    if (error) return handleError(error.message, loadingToastId);

    frontImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/front_image?${timestamp}`;
  } else if (formData.front_image) {
    const { error } = await removeImage(
      `public/${itineraryData.title}/front_image`,
      supabase,
      'itineraries',
    );

    if (error) return handleError(error.message, loadingToastId);

    const { dataImage, errorImage } = await uploadImage(
      formData.front_image[0],
      `front_image`,
      formData.title,
      supabase,
      'itineraries',
    );

    if (errorImage) return handleError(errorImage.message, loadingToastId);

    frontImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/front_image?${timestamp}`;
  }

  const { err } = await updateItinerary(
    supabase,
    formData,
    frontImage,
    detailImage,
    itineraryData.id,
  );

  if (err) {
    await removeImage(
      `public/${formData.title}/front_image`,
      supabase,
      'itineraries',
    );

    await removeImage(
      `public/${formData.title}/detail_image`,
      supabase,
      'itineraries',
    );

    handleError(err.message, loadingToastId);
    return;
  }

  return true;
};
