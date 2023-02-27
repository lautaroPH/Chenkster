/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import UploadSvg from '@/components/Svg/UploadSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getCountries } from '@/utils/getCountries';
import { getCities } from '@/utils/getCities';
import { getCategories } from '@/utils/getCategories';
import { allowedExtensions } from '@/utils/allowedExtension';
import { uploadImage } from '@/utils/uploadImage';
import { removeImage } from '@/utils/removeImage';
import { uploadImagePreview } from '@/utils/uploadImagePreview';
import { uploadItinerary } from '@/utils/uploadItinerary';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { countries } = await getCountries();
  const { cities } = await getCities();
  const { categories } = await getCategories();

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
      cities,
      categories,
    },
  };
};

export default function Itinerary({ user, countries, cities, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    country: '',
    budget: '',
    visit_period: '',
    city: '',
    street: '',
    categories: [],
    lat: '',
    lng: '',
  });
  const supabase = useSupabaseClient();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();

  const imageInputRef = useRef();
  const categorySelectRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    if (
      !formData.categories ||
      !formData.image ||
      !formData.city ||
      !formData.country ||
      !formData.description ||
      !formData.title ||
      !formData.budget ||
      !formData.visit_period ||
      !formData.street ||
      !formData.lat ||
      !formData.lng
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
      formData.title,
      supabase,
      'itineraries',
    );

    if (errorImage) return handleError(errorImage.message);

    const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/${dataImage.path}`;

    const { itinerary, err } = await uploadItinerary(
      supabase,
      user.id,
      formData,
      imagePath,
    );

    if (err) {
      const removedImage = await removeImage(
        dataImage.path,
        supabase,
        'itineraries',
      );

      handleError(err.message);
      return;
    }

    toast.success(`Successfully uploaded: ${formData.title}`);
    setLoading(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      country: '',
      budget: '',
      visit_period: '',
      city: '',
      street: '',
      categories: [],
      lat: '',
      lng: '',
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

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (formData.categories.includes(value)) {
      categorySelectRef.current.value = '';
      return;
    }
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, value],
    }));
    categorySelectRef.current.value = '';
  };

  return (
    <Layout title={'Upload itinerary'} username={user?.user_metadata?.username}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-12 mb-10 w-96"
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
          Select a city
        </label>
        <select
          name="city"
          id="city"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
          placeholder="Select a city"
          defaultValue={''}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a city
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.title}>
              {city.title}
            </option>
          ))}
        </select>
        <label
          htmlFor="categories"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Select a category
        </label>
        <select
          name="categories"
          id="categories"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          placeholder="Select a category"
          defaultValue={''}
          onChange={handleCategoryChange}
          ref={categorySelectRef}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {formData.categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-center px-2 py-1 text-sm font-semibold text-white rounded-lg bg-chenkster-gray"
            >
              {category}
              <button
                type="button"
                className="ml-2 text-sm font-bold text-white"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    categories: prev.categories.filter(
                      (cat) => cat !== category,
                    ),
                  }))
                }
              >
                x
              </button>
            </div>
          ))}
        </div>
        <label
          htmlFor="title"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Assaje..."
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
          placeholder="Assaje is a famous Pizzeria with Neapolitan origins, which means that the pizza is thick on the side and thin in the..."
          required
        />
        <label
          htmlFor="budget"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Budget
        </label>
        <input
          type="text"
          name="budget"
          id="budget"
          autoComplete="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="8-12€ per pizz.."
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="visit_period"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Visit period
        </label>
        <input
          type="text"
          name="visit_period"
          id="visit_period"
          autoComplete="visit_period"
          value={formData.visit_period}
          onChange={handleChange}
          placeholder="Lunch time 12:30 or dinner 20:00, because Italians are coming 30-45 minutes later and yo..."
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="street"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Street
        </label>
        <input
          type="text"
          name="street"
          id="street"
          autoComplete="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Via Traù, 2, 20159 Milano M.."
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="lat"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Latitude
        </label>
        <input
          type="number"
          name="lat"
          id="lat"
          autoComplete="lat"
          value={formData.lat}
          onChange={handleChange}
          placeholder="-34.876126"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="lng"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Longitude
        </label>
        <input
          type="number"
          name="lng"
          id="lng"
          autoComplete="lng"
          value={formData.lng}
          onChange={handleChange}
          placeholder="-57.881605"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Itinerary image
        </label>
        <div
          onClick={() => imageInputRef.current.click()}
          className="flex w-full gap-3 px-4 py-3 mb-3 text-base text-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        >
          Upload an image for the itinerary <UploadSvg />
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
            alt="Flag country"
            className="object-cover w-56 overflow-hidden max-h-56"
          />
        )}
        <p className="mt-2 mb-3 text-red-600">{error}</p>
        <button
          disabled={
            loading ||
            !formData.categories ||
            !formData.image ||
            !formData.city ||
            !formData.country ||
            !formData.description ||
            !formData.title ||
            !formData.budget ||
            !formData.visit_period ||
            !formData.street ||
            !formData.lat ||
            !formData.lng
          }
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
