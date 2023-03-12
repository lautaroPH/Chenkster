/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getCategories } from '@/utils/getCategories';
import { allowedExtensions } from '@/utils/allowedExtension';
import { uploadImage } from '@/utils/uploadImage';
import { removeImage } from '@/utils/removeImage';
import { uploadItinerary } from '@/utils/uploadItinerary';
import CategorySelected from '@/components/Dashboard/CategorySelected';
import { updateItinerary } from '@/utils/updateItinerary';
import { useRouter } from 'next/router';
import FileInput from '@/components/FileInput';
import { getCountries } from '@/utils/getCountries';
import { getCountryCities } from '@/utils/getCountryCities';
import { getItinerary } from '@/utils/getItinerary';
import { correctFile } from '@/utils/correctFile';
import { moveImage } from '@/utils/moveImage';

export const getServerSideProps = async (ctx) => {
  const { itineraryId } = ctx.params;
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { countries } = await getCountries();
  const { categories } = await getCategories();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/dashboard/itinerary/new',
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

  if (itineraryId === 'new') {
    return {
      props: {
        initialSession: data.user,
        user: data.user,
        categories,
        itinerary: null,
        countries,
      },
    };
  }

  const { itineraryData, err } = await getItinerary(itineraryId);

  if (err || !itineraryData)
    return {
      redirect: {
        destination: '/dashboard/itinerary/new',
        permanent: false,
      },
    };

  const categoriesItineraries = itineraryData.categories.map((category) => {
    const categoryWithSubCategories = categories.find(
      (categoryItem) => categoryItem.title === category,
    );
    return {
      ...categoryWithSubCategories,
    };
  });

  return {
    props: {
      initialSession: data.user,
      user: data.user,
      categories,
      itinerary: {
        ...itineraryData,
        categories: categoriesItineraries,
      },
      countries,
    },
  };
};

export default function Itinerary({ user, categories, itinerary, countries }) {
  const [formData, setFormData] = useState({
    country: itinerary?.country || '',
    title: itinerary?.title || '',
    description: itinerary?.description || '',
    budget: itinerary?.budget || '',
    visit_period: itinerary?.visit_period || '',
    city: itinerary?.city || '',
    street: itinerary?.street || '',
    categories: itinerary?.categories || [],
    lat: itinerary?.lat || '',
    lng: itinerary?.lng || '',
    sub_categories: itinerary?.sub_categories || [],
    front_image: '',
    detail_image: '',
    social_media: itinerary?.social_media || '',
    map_url: itinerary?.map_url || '',
  });

  const supabase = useSupabaseClient();
  const router = useRouter();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [frontImagePreview, setFrontImagePreview] = useState(
    itinerary?.front_image || '',
  );
  const [detailImagePreview, setDetailImagePreview] = useState(
    itinerary?.detail_image || '',
  );
  const [cities, setCities] = useState([]);

  const frontImageRef = useRef();
  const detailImageRef = useRef();
  const categorySelectRef = useRef();
  const subCategorySelectRef = useRef();
  const timestamp = Date.parse(itinerary.created_at);

  const disabled =
    !formData.categories ||
    !formData.city ||
    !formData.description ||
    !formData.title ||
    !formData.budget ||
    !formData.visit_period ||
    !formData.street ||
    !formData.lat ||
    !formData.lng ||
    !formData.sub_categories ||
    !formData.social_media ||
    !formData.map_url ||
    !frontImagePreview ||
    !detailImagePreview ||
    !formData.country;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');
    const itineraryData = itinerary;
    const detailImageCorrect = correctFile(
      formData?.detail_image[0]?.type,
      formData?.detail_image[0]?.size,
    );

    const frontImageCorrect = correctFile(
      formData?.front_image[0]?.type,
      formData?.front_image[0]?.size,
    );

    if (itineraryData) {
      let frontImage = itineraryData.front_image;
      let detailImage = itineraryData.detail_image;

      if (
        !formData.categories ||
        !formData.city ||
        !formData.description ||
        !formData.title ||
        !formData.budget ||
        !formData.visit_period ||
        !formData.street ||
        !formData.lat ||
        !formData.lng ||
        !formData.sub_categories ||
        !formData.social_media ||
        !formData.map_url ||
        !formData.country
      )
        return handleError('Please fill all the fields', loadingToastId);

      if (formData.front_image && !frontImageCorrect)
        return handleError(
          'File type is not supported or file size is too large for the front image',
          loadingToastId,
        );

      if (formData.detail_image && !detailImageCorrect)
        return handleError(
          'File type is not supported or file size is too large for the detail image',
          loadingToastId,
        );

      if (formData.title !== itineraryData.title && !formData.detail_image) {
        const { data, error } = await moveImage(
          `${itineraryData.title}/detail_image`,
          `${formData.title}/detail_image`,
          'itineraries',
          supabase,
        );

        if (error) return handleError(error.message, loadingToastId);

        detailImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/detail_image?${timestamp}`;
      } else if (formData.detail_image) {
        const { error } = await removeImage(
          `public/${itineraryData.title}/detail_image`,
          supabase,
          'itineraries',
        );

        if (error) return handleError(error.message, loadingToastId);

        const { dataImage, errorImage } = await uploadImage(
          formData.detail_image[0],
          `detail_image`,
          formData.title,
          supabase,
          'itineraries',
        );

        if (errorImage) return handleError(errorImage.message, loadingToastId);

        detailImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/detail_image?${timestamp}`;
      }

      if (formData.title !== itineraryData.title && !formData.front_image) {
        const { data, error } = await moveImage(
          `${itineraryData.title}/front_image`,
          `${formData.title}/front_image`,
          'itineraries',
          supabase,
        );

        if (error) return handleError(error.message, loadingToastId);

        detailImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/front_image?${timestamp}`;
      } else if (formData.front_image) {
        const { error } = await removeImage(
          `public/${itineraryData.title}/front_image`,
          supabase,
          'itineraries',
        );

        if (error) return handleError(error.message, loadingToastId);

        const { dataImage, errorImage } = await uploadImage(
          formData.front_image[0],
          `front_image`,
          formData.title,
          supabase,
          'itineraries',
        );

        if (errorImage) return handleError(errorImage.message, loadingToastId);

        detailImage = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/public/${formData.title}/front_image?${timestamp}`;
      }

      const { err } = await updateItinerary(
        supabase,
        user.id,
        formData,
        frontImage,
        detailImage,
        itineraryData.id,
      );

      if (err) {
        await removeImage(
          `public/${formData.title}/front_image`,
          supabase,
          'itineraries',
        );

        await removeImage(
          `public/${formData.title}/detail_image`,
          supabase,
          'itineraries',
        );

        handleError(err.message, loadingToastId);
        return;
      }
    } else {
      if (
        !formData.categories ||
        !formData.city ||
        !formData.description ||
        !formData.title ||
        !formData.budget ||
        !formData.visit_period ||
        !formData.street ||
        !formData.lat ||
        !formData.lng ||
        !formData.sub_categories ||
        !formData.social_media ||
        !formData.map_url ||
        !formData.front_image ||
        !formData.detail_image ||
        !formData.country
      )
        return handleError('Please fill all the fields', loadingToastId);

      if (!frontImageCorrect || !detailImageCorrect)
        return handleError(
          'File type is not supported or file size is too large for the image',
          loadingToastId,
        );

      const { dataImage: detailImage, errorImage: errorDetail } =
        await uploadImage(
          formData.detail_image[0],
          `detail_image`,
          formData.title,
          supabase,
          'itineraries',
        );

      const { dataImage, errorImage } = await uploadImage(
        formData.front_image[0],
        `front_image`,
        formData.title,
        supabase,
        'itineraries',
      );

      if (errorImage || errorDetail)
        return handleError(
          errorImage.statusCode === '409' || errorDetail.statusCode === '409'
            ? 'The place already exists'
            : errorImage.message || errorDetail.message,
          loadingToastId,
        );

      const frontPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/${dataImage.path}?${timestamp}`;
      const detailPath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/${detailImage.path}?${timestamp}`;

      const { itinerary, err } = await uploadItinerary(
        supabase,
        user.id,
        formData,
        frontPath,
        detailPath,
      );

      if (err) {
        await removeImage(dataImage.path, supabase, 'itineraries');

        await removeImage(detailImage.path, supabase, 'itineraries');

        handleError(err.message, loadingToastId);
        return;
      }
    }

    toast.dismiss(loadingToastId);
    toast.success(`Successfully uploaded: ${formData.title}`);
    router.push(`/itineraries/uploaded`);
    setLoading(false);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      const { cities } = await getCountryCities(value);
      setCities(cities);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (error, loadingToastId) => {
    toast.dismiss(loadingToastId);
    setLoading(false);
    setError(error);
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (formData.categories.find((c) => c.title === value)) {
      categorySelectRef.current.value = '';
      return;
    }
    const category = categories.find((category) => category.title === value);
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, category],
    }));
    categorySelectRef.current.value = '';
  };

  const handleSubCategoryChange = (e) => {
    const { value } = e.target;
    if (formData.sub_categories.includes(value)) {
      subCategorySelectRef.current.value = '';
      return;
    }

    setFormData((prev) => ({
      ...prev,
      sub_categories: [...prev.sub_categories, value],
    }));
    subCategorySelectRef.current.value = '';
  };

  const removeCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.title !== category),
    }));
  };

  const removeSubCategory = (subCategory) => {
    setFormData((prev) => ({
      ...prev,
      sub_categories: prev.sub_categories.filter((c) => c !== subCategory),
    }));
  };

  const updateImageData = (files, name) => {
    setFormData((prev) => ({ ...prev, [name]: files }));
  };

  const uploadDetailImagePreview = async (file) => {
    setDetailImagePreview(file);
  };

  const uploadFrontImagePreview = async (file) => {
    setFrontImagePreview(file);
  };

  const handleMapUrl = (e) => {
    const url = e.target.value;
    const regex = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const match = url.match(regex);

    if (match) {
      const lat = match[1];
      const lng = match[2];
      setFormData((prev) => ({
        ...prev,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        map_url: url,
      }));
    }
  };

  return (
    <Layout
      url={'/dashboard'}
      title={itinerary ? 'Edit itinerary' : 'Upload itinerary'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mb-10 w-96"
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
          value={formData.country}
          onChange={handleChange}
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
          value={formData.city}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a city
          </option>
          {itinerary && cities.length === 0 && (
            <option key={itinerary.city.id} value={itinerary.city.id}>
              {itinerary.city.title}
            </option>
          )}

          {cities.map((city) => (
            <option key={city.id} value={city.id}>
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
            <CategorySelected
              key={category.id}
              removeItem={removeCategory}
              title={category.title}
            />
          ))}
        </div>
        <label
          htmlFor="sub_categories"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Select a sub category
        </label>
        <select
          name="sub_categories"
          id="sub_categories"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          placeholder="Select a sub categories"
          defaultValue={''}
          onChange={handleSubCategoryChange}
          ref={subCategorySelectRef}
        >
          <option value="" disabled>
            Select a sub categories
          </option>
          {formData.categories.map((categoria) =>
            categoria.sub_categories.map((subcategoria) => (
              <option
                key={`${subcategoria}-${categoria.id}`}
                value={subcategoria}
              >
                {subcategoria}
              </option>
            )),
          )}
        </select>
        <div className="flex flex-wrap gap-2">
          {formData.sub_categories.map((category) => (
            <CategorySelected
              key={category}
              removeItem={removeSubCategory}
              title={category}
            />
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
        />{' '}
        <label
          htmlFor="social_media"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Social media link
        </label>
        <input
          type="url"
          name="social_media"
          id="social_media"
          autoComplete="social_media"
          value={formData.social_media}
          onChange={handleChange}
          placeholder="https://www.instagram.com/assaje_milano/"
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
          htmlFor="map_url"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Google Map Url
        </label>
        <input
          type="url"
          name="map_url"
          id="map_url"
          autoComplete="map_url"
          value={formData.map_url}
          onChange={handleMapUrl}
          placeholder="https://www.google.com/maps/place/Parrilla+El+Pampa+Sal%C3%B3n+Familiar+%2F+Shows+En+Vivo/@-34.8788851,-57.8781179,16z"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
          required
        />
        <label
          htmlFor="front_image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Front image
        </label>
        <FileInput
          name="front_image"
          inputRef={frontImageRef}
          title="Upload a front image for the itinerary"
          handleData={updateImageData}
          handlePreview={uploadFrontImagePreview}
        />
        {frontImagePreview && (
          <img
            src={frontImagePreview}
            alt="image preview"
            className="object-cover h-40 w-80 rounded-xl"
          />
        )}
        <label
          htmlFor="detail_image"
          className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
        >
          Detail image
        </label>
        <FileInput
          name="detail_image"
          inputRef={detailImageRef}
          title="Upload a detail image for the itinerary"
          handleData={updateImageData}
          handlePreview={uploadDetailImagePreview}
        />
        {detailImagePreview && (
          <img
            src={detailImagePreview}
            alt="image preview"
            className="object-cover w-96 h-60 rounded-2xl"
          />
        )}
        <p className="mt-2 mb-3 text-red-600">{error}</p>
        <button
          disabled={loading || disabled}
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
