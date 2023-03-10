/* eslint-disable @next/next/no-img-element */
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import UploadSvg from '@/components/Svg/UploadSvg';
import { allowedExtensions } from '@/utils/allowedExtension';
import { removeImage } from '@/utils/removeImage';
import { uploadCountry } from '@/utils/uploadCountry';
import { uploadImage } from '@/utils/uploadImage';
import { uploadImagePreview } from '@/utils/uploadImagePreview';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/dashboard/country',
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

export default function Country({ user }) {
  const [formData, setFormData] = useState({
    country: '',
    flag: '',
    bg_image: '',
  });
  const supabase = useSupabaseClient();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [flagPreview, setFlagPreview] = useState();
  const [bgImagePreview, setBgImagePreview] = useState();

  const flagInputRef = useRef();
  const bgImageInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');

    if (!formData.country || !formData.flag || !formData.bg_image)
      return handleError('Please fill all the fields', loadingToastId);

    const flagCorrect =
      allowedExtensions.exec(formData.flag[0].type) &&
      formData.flag[0].size < 700000;
    const bgImageCorrect =
      allowedExtensions.exec(formData.bg_image[0].type) &&
      formData.bg_image[0].size < 700000;

    if (!flagCorrect && !bgImageCorrect)
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

    if (errorImage) return handleError(errorImage.message, loadingToastId);

    const { dataImage: data, errorImage: error } = await uploadImage(
      formData.bg_image[0],
      `bg_image`,
      formData.country,
      supabase,
      'countries',
    );

    if (error) return handleError(error.message, loadingToastId);

    const flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/${dataImage.path}`;
    const bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/${data.path}`;

    const { country, err } = await uploadCountry(
      formData.country,
      supabase,
      flagPath,
      bgImagePath,
      user.id,
    );

    if (err) {
      const removeFlag = await removeImage(
        dataImage.path,
        supabase,
        'countries',
      );

      const removeBgImage = await removeImage(data.path, supabase, 'countries');

      handleError(err.message, loadingToastId);
      return;
    }

    toast.dismiss(loadingToastId);
    toast.success(`Successfully uploaded: ${formData.country}`);
    setLoading(false);
    setFormData({
      country: '',
      flag: '',
      bg_image: '',
    });
    setFlagPreview();
    setBgImagePreview();
    flagInputRef.current.value = '';
    bgImageInputRef.current.value = '';
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

  const uploadFlagPreview = async (file) => {
    setFlagPreview(file);
  };

  const uploadBgPreview = async (file) => {
    setBgImagePreview(file);
  };

  return (
    <Layout
      url={'/dashboard'}
      title={'Upload country'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <label
          htmlFor="country"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Country
        </label>
        <input
          type="text"
          name="country"
          id="country"
          autoComplete="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Italy..."
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="flag"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Flag
        </label>
        <FileInput
          name="flag"
          inputRef={flagInputRef}
          title="Upload a flag picture"
          handleData={updateImageData}
          handlePreview={uploadFlagPreview}
        />
        {flagPreview && (
          <img
            src={flagPreview}
            alt="Flag country"
            className="object-cover w-16 overflow-hidden"
          />
        )}
        <label
          htmlFor="bg_image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Background image
        </label>
        <FileInput
          name="bg_image"
          inputRef={bgImageInputRef}
          title="Upload a background image"
          handleData={updateImageData}
          handlePreview={uploadBgPreview}
        />
        {bgImagePreview && (
          <img
            src={bgImagePreview}
            alt="Background image country"
            className="object-cover overflow-hidden w-52 max-h-52"
          />
        )}
        <p className="mt-2 mb-3 text-red-600">{error}</p>
        <button
          disabled={
            loading || !formData.country || !formData.flag || !formData.bg_image
          }
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
