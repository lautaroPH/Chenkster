/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import UploadSvg from '@/components/Svg/UploadSvg';
import { allowedExtensions } from '@/utils/allowedExtension';
import { getCountries } from '@/utils/getCountries';
import { removeImage } from '@/utils/removeImage';
import { uploadCity } from '@/utils/uploadCity';
import { uploadImage } from '@/utils/uploadImage';
import { uploadImagePreview } from '@/utils/uploadImagePreview';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();
  const { countries } = await getCountries();

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
      countries,
    },
  };
};

export default function City({ user, countries }) {
  const [formData, setFormData] = useState({
    city: '',
    description: '',
    image: '',
    country: '',
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
    if (
      !formData.city ||
      !formData.description ||
      !formData.image ||
      !formData.country
    )
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
      formData.city,
      supabase,
      'cities',
    );

    if (errorImage) return handleError(errorImage.message);

    const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/cities/${dataImage.path}`;

    const { city, err } = await uploadCity(
      formData.city,
      supabase,
      formData.description,
      imagePath,
      user.id,
      formData.country,
    );

    if (err) {
      const removedImage = await removeImage(
        dataImage.path,
        supabase,
        'cities',
      );

      handleError(err.message);
      return;
    }

    toast.success(`Successfully uploaded: ${formData.city}`);
    setLoading(false);
    setFormData({
      city: '',
      description: '',
      image: '',
      country: '',
    });
    setImagePreview();
    imageInputRef.current.value = '';
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
    <Layout title={'Upload city'} username={user?.user_metadata?.username}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <label
          htmlFor="country"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Select a country
        </label>
        <select
          name="country"
          id="country"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
          placeholder="Select a country"
          defaultValue={''}
          onChange={handleChange}
          value={formData.country}
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.title}>
              {country.title}
            </option>
          ))}
        </select>
        <label
          htmlFor="city"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          value={formData.city}
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
        <div
          onClick={() => imageInputRef.current.click()}
          className="flex w-full gap-3 px-4 py-3 mb-3 text-base text-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        >
          Upload a image for the city <UploadSvg />
        </div>
        <input
          type="file"
          name="image"
          id="image"
          hidden
          ref={imageInputRef}
          onChange={(e) => uploadImagePreview(e, setImagePreview, setFormData)}
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image for the city"
            className="object-cover overflow-hidden w-52 max-h-52"
          />
        )}
        <p className="mt-2 mb-3 text-red-600">{error}</p>
        <button
          disabled={
            loading ||
            !formData.description ||
            !formData.city ||
            !formData.image ||
            !formData.country
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
