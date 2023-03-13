/* eslint-disable @next/next/no-img-element */
import SelectCountry from '@/components/Dashboard/City/SelectCountry';
import FormLabel from '@/components/Dashboard/FormLabel';
import ImagePreview from '@/components/Dashboard/ImagePreview';
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import { correctFile } from '@/utils/correctFile';
import { getCity } from '@/services/get/getCity';
import { getCountries } from '@/services/get/getCountries';
import { handleAddCity } from '@/utils/handleAddCity';
import { handleEditCity } from '@/utils/handleEditCity';
import { moveImage } from '@/services/update/moveImage';
import { removeImage } from '@/services/delete/removeImage';
import { updateCity } from '@/services/update/updateCity';
import { uploadCity } from '@/services/upload/uploadCity';
import { uploadImage } from '@/services/upload/uploadImage';
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
  const timestamp = Date.parse(city?.created_at);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');
    const cityData = city;

    if (cityData) {
      const ok = await handleEditCity(
        formData,
        cityData,
        handleError,
        loadingToastId,
        supabase,
        timestamp,
        user.id,
      );

      if (!ok) return;
    } else {
      const ok = await handleAddCity(
        formData,
        handleError,
        loadingToastId,
        supabase,
        timestamp,
        user.id,
      );

      if (!ok) return;
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
      userId={user?.id}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <SelectCountry
          countries={countries}
          handleChange={handleChange}
          countryId={formData.country_id}
        />
        <FormLabel title={'City'} name="title" />
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
        <FormLabel title={'Description'} name="description" />
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="px-2 py-2 text-sm font-medium placeholder-gray-500 bg-transparent border border-gray-400 rounded-lg resize-none placeholder:font-lato font-lato"
          placeholder="Milan is a city where you can find a lot of things to do..."
          required
        />
        <FormLabel title={'Image city'} name="image" />
        <FileInput
          name="image"
          inputRef={imageInputRef}
          title="Upload a image for the city"
          handleData={updateImageData}
          handlePreview={uploadImagePreview}
        />
        <ImagePreview
          alt="Image for the city"
          imagePreview={imagePreview}
          styles="object-cover h-32 w-28 rounded-2xl"
        />
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
