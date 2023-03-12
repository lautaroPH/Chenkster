/* eslint-disable @next/next/no-img-element */
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import { correctFile } from '@/utils/correctFile';
import { getCity } from '@/utils/getCity';
import { getCountries } from '@/utils/getCountries';
import { moveImage } from '@/utils/moveImage';
import { removeImage } from '@/utils/removeImage';
import { updateCity } from '@/utils/updateCity';
import { uploadCity } from '@/utils/uploadCity';
import { uploadImage } from '@/utils/uploadImage';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export const getServerSideProps = async (ctx) => {
  const { cityId } = ctx.params;

  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();
  const { countries } = await getCountries();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/dashboard/city/new',
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

  if (cityId === 'new') {
    return {
      props: {
        initialSession: data.user,
        user: data.user,
        countries,
      },
    };
  }

  const { city, err } = await getCity(cityId);

  if (err || !city) return { notFound: true };

  return {
    props: {
      initialSession: data.user,
      user: data.user,
      countries,
      city,
    },
  };
};

export default function City({ user, countries, city }) {
  const [formData, setFormData] = useState({
    title: city?.title || '',
    description: city?.description || '',
    image: '',
    country_id: city?.country_id || '',
  });
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(city?.image || '');

  const imageInputRef = useRef();
  const timestamp = Date.parse(city.created_at);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');
    const cityData = city;
    const imageCorrect = correctFile(
      formData?.image[0]?.type,
      formData?.image[0]?.size,
    );

    if (cityData) {
      let imagePath = cityData.image;
      if (!formData.title || !formData.description || !formData.country_id)
        return handleError('Please fill all the fields', loadingToastId);

      if (formData.image && !imageCorrect)
        return handleError(
          'File type is not supported or file size is too large for image',
          loadingToastId,
        );

      if (formData.title !== cityData.title && !formData.image) {
        const { data, error } = await moveImage(
          `${cityData.title}/image`,
          `${formData.title}/image`,
          'cities',
          supabase,
        );

        if (error) return handleError(error.message, loadingToastId);

        imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/public/${formData.title}/image?${timestamp}`;
      } else if (formData.image) {
        const { error } = await removeImage(
          `public/${cityData.title}/image`,
          supabase,
          'cities',
        );

        if (error) return handleError(error.message, loadingToastId);

        const { dataImage, errorImage } = await uploadImage(
          formData.image[0],
          `image`,
          formData.title,
          supabase,
          'cities',
        );

        if (errorImage) return handleError(errorImage.message, loadingToastId);

        imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/public/${formData.title}/image?${timestamp}`;
      }
      const { country, err } = await updateCity(
        formData,
        supabase,
        imagePath,
        user.id,
        cityData.title,
      );

      if (err) {
        await removeImage(`public/${formData.title}/image`, supabase, 'cities');

        handleError(err.message, loadingToastId);
        return;
      }
    } else {
      if (
        !formData.title ||
        !formData.description ||
        !formData.image ||
        !formData.country_id
      )
        return handleError('Please fill all the fields', loadingToastId);

      if (!imageCorrect)
        return handleError(
          'File type is not supported or file size is too large for image',
          loadingToastId,
        );

      const { dataImage, errorImage } = await uploadImage(
        formData.image[0],
        `image`,
        formData.title,
        supabase,
        'cities',
      );

      if (errorImage) return handleError(errorImage.message, loadingToastId);

      const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/${dataImage.path}?${timestamp}`;

      const { city, err } = await uploadCity(
        formData,
        supabase,
        imagePath,
        user.id,
      );

      if (err) {
        await removeImage(dataImage.path, supabase, 'cities');

        handleError(err.message, loadingToastId);
        return;
      }
    }
    const country = countries.find(
      (country) => country.id === formData.country_id,
    );

    router.push(`/country/${country.title}`);
    toast.dismiss(loadingToastId);
    toast.success(`Successfully uploaded: ${formData.title}`);
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
      title={city ? 'Edit City' : 'Upload City'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <label
          htmlFor="country_id"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Select a country
        </label>
        <select
          name="country_id"
          id="country_id"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
          placeholder="Select a country"
          onChange={handleChange}
          value={formData.country_id}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.title}
            </option>
          ))}
        </select>
        <label
          htmlFor="title"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          City
        </label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Milan..."
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="description"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="px-2 py-2 text-sm font-medium placeholder-gray-500 bg-transparent border border-gray-400 rounded-lg resize-none placeholder:font-lato font-lato"
          placeholder="Milan is a city where you can find a lot of things to do..."
          required
        />
        <label
          htmlFor="image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Image city
        </label>
        <FileInput
          name="image"
          inputRef={imageInputRef}
          title="Upload a image for the city"
          handleData={updateImageData}
          handlePreview={uploadImagePreview}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image for the city"
            className="object-cover h-32 w-28 rounded-2xl"
          />
        )}
        <p className="mt-2 mb-3 text-red-600">{error}</p>
        <button
          disabled={
            loading ||
            !formData.description ||
            !formData.title ||
            !imagePreview ||
            !formData.country_id
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
