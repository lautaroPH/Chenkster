import FormLabel from '@/components/Dashboard/FormLabel';
import ImagePreview from '@/components/Dashboard/ImagePreview';
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import { handleAddCategory } from '@/utils/handleAddCategory';
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

    const ok = await handleAddCategory(
      formData,
      handleError,
      loadingToastId,
      supabase,
      user.id,
    );

    if (!ok) return;

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

  const handleError = (error, loadingToastId) => {
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
    <Layout
      url={'/dashboard'}
      title={'Upload category'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
      userId={user?.id}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <FormLabel name="category" title="Category" />
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
        <FormLabel name={'sub_categories'} title={'Sub categories'} />
        <textarea
          name="sub_categories"
          rows={3}
          value={formData.sub_categories}
          onChange={handleChange}
          className="px-2 py-2 text-sm font-medium placeholder-gray-500 bg-transparent border border-gray-400 rounded-lg resize-none placeholder:font-lato font-lato"
          placeholder="Meat, Fish, Vegetarian, Vegan, etc... (Important to separate with commas)"
          required
        />
        <FormLabel name="image" title="Image" />
        <FileInput
          name="image"
          inputRef={imageInputRef}
          title=" Upload an image for the category"
          handleData={updateImageData}
          handlePreview={uploadImagePreview}
        />
        <ImagePreview
          alt={'Category image'}
          imagePreview={imagePreview}
          styles={'object-cover w-36 h-36 rounded-xl'}
        />
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
