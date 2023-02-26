/* eslint-disable @next/next/no-img-element */
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
        destination: '/login',
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
  });
  const supabase = useSupabaseClient();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();

  const imageInputREf = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    if (!formData.category || !formData.image)
      return handleError('Please fill all the fields');

    const imageCorrect =
      allowedExtensions.exec(formData.image[0].type) &&
      formData.image[0].size < 700000;

    if (!imageCorrect)
      return handleError(
        'File type is not supported or file size is too large for flag and background image',
      );

    const { dataImage, errorImage } = await uploadImage(
      formData.image[0],
      `image`,
      formData.category,
      supabase,
      'categories',
    );

    if (errorImage) return handleError(errorImage.message);

    const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/categories/${dataImage.path}`;

    const { category, err } = await uploadCategory(
      formData.category,
      supabase,
      imagePath,
      user.id,
    );

    if (err) {
      const removedImage = await removeImage(
        `public/${dataImage.path}`,
        supabase,
        'categories',
      );

      handleError(err.message);
      return;
    }

    toast.success(`Successfully uploaded: ${formData.category}`);
    setLoading(false);
    setFormData({
      category: '',
      image: '',
    });
    setImagePreview();
    imageInputREf.current.value = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (error) => {
    setLoading(false);
    setError(error);
  };

  return (
    <Layout title={'Upload category'} username={user?.user_metadata?.username}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-12 w-96"
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
          htmlFor="image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Category image
        </label>
        <div
          onClick={() => imageInputREf.current.click()}
          className="flex w-full gap-3 px-4 py-3 mb-3 text-base text-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        >
          Upload an image for the category <UploadSvg />
        </div>
        <input
          type="file"
          name="image"
          id="image"
          hidden
          ref={imageInputREf}
          onChange={(e) => uploadImagePreview(e, setImagePreview, setFormData)}
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Flag country"
            className="object-cover w-16 overflow-hidden"
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
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  );
}
