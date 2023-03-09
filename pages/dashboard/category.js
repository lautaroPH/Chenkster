/* eslint-disable @next/next/no-img-element */
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import UploadSvg from '@/components/Svg/UploadSvg';
import { allowedExtensions } from '@/utils/allowedExtension';
import { removeImage } from '@/utils/removeImage';
import { uploadCategory } from '@/utils/uploadCategory';
import { uploadImage } from '@/utils/uploadImage';
import { uploadImagePreview } from '@/utils/uploadImagePreview';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/dashboard/category',
        permanent: false,
      },
    };

  if (data.user.user_metadata.role !== 'admin') {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: data.user,
      user: data.user,
    },
  };
};

export default function Category({ user }) {
  const [formData, setFormData] = useState({
    category: '',
    image: '',
    sub_categories: '',
  });
  const supabase = useSupabaseClient();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();

  const imageInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');

    if (!formData.category || !formData.image || !formData.sub_categories)
      return handleError('Please fill all the fields', loadingToastId);

    const imageCorrect =
      allowedExtensions.exec(formData.image[0].type) &&
      formData.image[0].size < 700000;

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
      user.id,
      subCategories,
    );
    console.log(err);
    if (err) {
      const removedImage = await removeImage(
        dataImage.path,
        supabase,
        'categories',
      );

      handleError(err.message, loadingToastId);
      return;
    }
    toast.dismiss(loadingToastId);
    toast.success(`Successfully uploaded: ${formData.category}`);
    setLoading(false);
    setFormData({
      category: '',
      image: '',
      sub_categories: '',
    });
    setImagePreview();
    imageInputRef.current.value = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (error) => {
    toast.dismiss(loadingToastId);
    setLoading(false);
    setError(error);
  };

  const updateImageData = (files, name) => {
    setFormData((prev) => ({ ...prev, [name]: files }));
  };

  const uploadImagePreview = async (file) => {
    setImagePreview(file);
  };

  return (
    <Layout title={'Upload category'} username={user?.user_metadata?.username}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <label
          htmlFor="category"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          autoComplete="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Going out..."
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="sub_categories"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Sub categories
        </label>
        <textarea
          name="sub_categories"
          rows={3}
          value={formData.sub_categories}
          onChange={handleChange}
          className="px-2 py-2 text-sm font-medium placeholder-gray-500 bg-transparent border border-gray-400 rounded-lg resize-none placeholder:font-lato font-lato"
          placeholder="Meat, Fish, Vegetarian, Vegan, etc... (Important to separate with commas)"
          required
        />
        <label
          htmlFor="image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Category image
        </label>
        <FileInput
          name="image"
          inputRef={imageInputRef}
          title=" Upload an image for the category"
          handleData={updateImageData}
          handlePreview={uploadImagePreview}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Flag country"
            className="object-cover overflow-hidden w-52 max-h-52"
          />
        )}
        <p className="mt-2 mb-3 text-red-600">{error}</p>
        <button
          disabled={loading || !formData.category || !formData.image}
          type="submit"
          className="w-full py-3 font-semibold text-center text-white rounded-lg disabled:opacity-60 disabled:cursor-not-allowed background-gradient font-poppins"
        >
          Submit
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}
