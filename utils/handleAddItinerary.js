import { correctFile } from './correctFile';
import { removeImage } from '../services/delete/removeImage';
import { uploadImage } from '../services/upload/uploadImage';
import { uploadItinerary } from '../services/upload/uploadItinerary';

export const handleAddItinerary = async (
  formData,
  handleError,
  loadingToastId,
  supabase,
  timestamp,
  userId,
) => {
  const detailImageCorrect = correctFile(
    formData?.detail_image[0]?.type,
    formData?.detail_image[0]?.size,
  );

  const frontImageCorrect = correctFile(
    formData?.front_image[0]?.type,
    formData?.front_image[0]?.size,
  );

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
    !formData.front_image ||
    !formData.detail_image ||
    !formData.country
  )
    return handleError('Please fill all the fields', loadingToastId);

  if (!frontImageCorrect || !detailImageCorrect)
    return handleError(
      'File type is not supported or file size is too large for the image',
      loadingToastId,
    );

  const { dataImage: detailImage, errorImage: errorDetail } = await uploadImage(
    formData.detail_image[0],
    `detail_image`,
    formData.title,
    supabase,
    'itineraries',
  );

  const { dataImage, errorImage } = await uploadImage(
    formData.front_image[0],
    `front_image`,
    formData.title,
    supabase,
    'itineraries',
  );

  if (errorImage || errorDetail)
    return handleError(
      errorImage.statusCode === '409' || errorDetail.statusCode === '409'
        ? 'The place already exists'
        : errorImage.message || errorDetail.message,
      loadingToastId,
    );

  const frontPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/${dataImage.path}?${timestamp}`;
  const detailPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/${detailImage.path}?${timestamp}`;

  const { itinerary, err } = await uploadItinerary(
    supabase,
    userId,
    formData,
    frontPath,
    detailPath,
  );

  if (err) {
    await removeImage(dataImage.path, supabase, 'itineraries');

    await removeImage(detailImage.path, supabase, 'itineraries');

    handleError(err.message, loadingToastId);
    return;
  }

  return true;
};
