import { correctFile } from './correctFile';
import { removeImage } from '../services/delete/removeImage';
import { uploadCategory } from '../services/upload/uploadCategory';
import { uploadImage } from '../services/upload/uploadImage';

export const handleAddCategory = async (
  formData,
  handleError,
  loadingToastId,
  supabase,
  userId,
) => {
  if (!formData.category || !formData.image || !formData.sub_categories)
    return handleError('Please fill all the fields', loadingToastId);

  const imageCorrect = correctFile(
    formData?.image[0]?.type,
    formData?.image[0]?.size,
  );

  if (!imageCorrect)
    return handleError(
      'File type is not supported or file size is too large for flag and background image',
      loadingToastId,
    );

  const { dataImage, errorImage } = await uploadImage(
    formData.image[0],
    `image`,
    formData.category,
    supabase,
    'categories',
  );

  if (errorImage) return handleError(errorImage.message, loadingToastId);

  const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/categories/${dataImage.path}`;

  const subCategories = formData.sub_categories
    .split(',')
    .map((sub) => sub.trim());

  const { category, err } = await uploadCategory(
    formData.category,
    supabase,
    imagePath,
    userId,
    subCategories,
  );

  if (err) {
    const removedImage = await removeImage(
      dataImage.path,
      supabase,
      'categories',
    );

    handleError(err.message, loadingToastId);
    return;
  }

  return true;
};
