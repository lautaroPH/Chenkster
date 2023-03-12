/* eslint-disable @next/next/no-img-element */
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import { allowedExtensions } from '@/utils/allowedExtension';
import { getCountry } from '@/utils/getCountry';
import { removeImage } from '@/utils/removeImage';
import { updateCountry } from '@/utils/updateCountry';
import { uploadCountry } from '@/utils/uploadCountry';
import { uploadImage } from '@/utils/uploadImage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const getServerSideProps = async (ctx) => {
  const { countryId } = ctx.params;
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

  if (countryId === 'new') {
    return {
      props: {
        initialSession: data.user,
        user: data.user,
      },
    };
  }

  const { countryData, err } = await getCountry(countryId);

  if (err || !countryData) return { notFound: true };

  return {
    props: {
      initialSession: data.user,
      user: data.user,
      country: countryData,
    },
  };
};

export default function Country({ user, country }) {
  const [formData, setFormData] = useState({
    country: country?.title || '',
    flag: '',
    bg_image: '',
  });
  const supabase = useSupabaseClient();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [flagPreview, setFlagPreview] = useState(country?.flag || '');
  const [bgImagePreview, setBgImagePreview] = useState(country?.bg_image || '');

  const timestamp = Date.parse(country.created_at);
  const flagInputRef = useRef();
  const bgImageInputRef = useRef();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');
    const countryData = country;
    const flagCorrect =
      allowedExtensions.exec(formData?.flag[0]?.type) &&
      formData?.flag[0]?.size < 3000000;
    const bgImageCorrect =
      allowedExtensions.exec(formData?.bg_image[0]?.type) &&
      formData?.bg_image[0]?.size < 3000000;

    if (countryData) {
      let flagPath = countryData.flag;
      let bgImagePath = countryData.bg_image;

      if (!formData.country)
        return handleError('Please fill all the fields', loadingToastId);

      if (formData.flag && !flagCorrect) {
        return handleError(
          'File type is not supported or file size is too large for flag',
          loadingToastId,
        );
      }

      if (formData.bg_image && !bgImageCorrect) {
        return handleError(
          'File type is not supported or file size is too large for background image',
          loadingToastId,
        );
      }

      if (formData.country !== countryData.title && !formData.flag) {
        const { data, error } = await supabase.storage
          .from('countries')
          .move(
            `public/${countryData.title}/flag`,
            `public/${formData.country}/flag`,
          );
        if (error) {
          handleError(error.message, loadingToastId);
          return;
        }

        flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/flag?${timestamp}`;
      } else if (formData.flag) {
        const { error } = await removeImage(
          `public/${countryData.title}/flag`,
          supabase,
          'countries',
        );
        if (error) {
          handleError(error.message, loadingToastId);
          return;
        }

        const { dataImage, errorImage } = await uploadImage(
          formData.flag[0],
          `flag`,
          formData.country,
          supabase,
          'countries',
        );

        if (errorImage) {
          handleError(errorImage.message, loadingToastId);
          return;
        }

        flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/flag?${timestamp}`;
      }

      if (formData.country !== countryData.title && !formData.bg_image) {
        const { data, error } = await supabase.storage
          .from('countries')
          .move(
            `public/${countryData.title}/bg_image`,
            `public/${formData.country}/bg_image`,
          );
        if (error) {
          handleError(error.message, loadingToastId);
          return;
        }

        bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/bg_image?${timestamp}`;
      } else if (formData.bg_image) {
        const { error } = await removeImage(
          `public/${countryData.title}/bg_image`,
          supabase,
          'countries',
        );
        if (error) {
          handleError(error.message, loadingToastId);
          return;
        }

        const { dataImage, errorImage } = await uploadImage(
          formData.bg_image[0],
          `bg_image`,
          formData.country,
          supabase,
          'countries',
        );

        if (errorImage) {
          handleError(errorImage.message, loadingToastId);
          return;
        }

        bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/public/${formData.country}/bg_image?${timestamp}`;
      }

      const { country, err } = await updateCountry(
        formData.country,
        supabase,
        flagPath,
        bgImagePath,
        user.id,
        countryData.id,
      );

      if (err) {
        handleError(err.message, loadingToastId);
        return;
      }
    } else {
      if (!formData.country || !formData.flag || !formData.bg_image)
        return handleError('Please fill all the fields', loadingToastId);

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

      const { dataImage: data, errorImage: error } = await uploadImage(
        formData.bg_image[0],
        `bg_image`,
        formData.country,
        supabase,
        'countries',
      );

      if (errorImage || error) {
        handleError(error.message || errorImage.message, loadingToastId);
        return;
      }

      const flagPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/${dataImage.path}?${timestamp}`;
      const bgImagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/countries/${data.path}?${timestamp}`;

      const { country, err } = await uploadCountry(
        formData.country,
        supabase,
        flagPath,
        bgImagePath,
        user.id,
      );

      if (err) {
        await removeImage(dataImage.path, supabase, 'countries');

        await removeImage(data.path, supabase, 'countries');

        handleError(err.message, loadingToastId);
        return;
      }
    }

    router.push('/welcome');
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

  const handleError = (error, loadingToastId) => {
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
            loading || !formData.country || !flagPreview || !bgImagePreview
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
