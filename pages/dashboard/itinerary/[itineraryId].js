/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import UploadSvg from '@/components/Svg/UploadSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getCities } from '@/utils/getCities';
import { getCategories } from '@/utils/getCategories';
import { allowedExtensions } from '@/utils/allowedExtension';
import { uploadImage } from '@/utils/uploadImage';
import { removeImage } from '@/utils/removeImage';
import { uploadImagePreview } from '@/utils/uploadImagePreview';
import { uploadItinerary } from '@/utils/uploadItinerary';
import CategorySelected from '@/components/Dashboard/CategorySelected';
import { updateItinerary } from '@/utils/updateItinerary';
import { useRouter } from 'next/router';
import FileInput from '@/components/FileInput';

export const getServerSideProps = async (ctx) => {
  const { itineraryId } = ctx.params;
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { cities } = await getCities();
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
        cities,
        categories,
        itinerary: null,
      },
    };
  }

  const { data: itinerary, error: errorItinerary } = await supabase
    .from('itineraries')
    .select('*')
    .eq('id', itineraryId)
    .single();

  if (errorItinerary || !itinerary)
    return {
      redirect: {
        destination: '/dashboard/itinerary/new',
        permanent: false,
      },
    };

  const categoriesItineraries = itinerary.categories.map((category) => {
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
      cities,
      categories,
      itinerary: {
        ...itinerary,
        categories: categoriesItineraries,
      },
    },
  };
};

export default function Itinerary({ user, cities, categories, itinerary }) {
  const [formData, setFormData] = useState({
    title: itinerary ? itinerary.title : '',
    description: itinerary ? itinerary.description : '',
    image: itinerary ? itinerary.image : '',
    budget: itinerary ? itinerary.budget : '',
    visit_period: itinerary ? itinerary.visit_period : '',
    city: itinerary ? itinerary.city : '',
    street: itinerary ? itinerary.street : '',
    categories: itinerary ? itinerary.categories : [],
    lat: itinerary ? itinerary.lat : '',
    lng: itinerary ? itinerary.lng : '',
    sub_categories: itinerary ? itinerary.sub_categories : [],
  });
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();

  const imageInputRef = useRef();
  const categorySelectRef = useRef();
  const subCategorySelectRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);
    const loadingToastId = toast.loading('Loading...');
    if (
      !formData.categories ||
      !formData.image ||
      !formData.city ||
      !formData.description ||
      !formData.title ||
      !formData.budget ||
      !formData.visit_period ||
      !formData.street ||
      !formData.lat ||
      !formData.lng ||
      !formData.sub_categories
    )
      return handleError('Please fill all the fields');

    const imageCorrect =
      allowedExtensions.exec(formData.image[0].type) &&
      formData.image[0].size < 5000000;

    if (!imageCorrect)
      return handleError(
        'File type is not supported or file size is too large for flag and background image',
      );

    if (itinerary) {
      const { error } = await removeImage(
        `public/${itinerary.title}/image`,
        supabase,
        'itineraries',
      );

      if (error) {
        handleError(error.message);
        return;
      }
    }

    const { dataImage, errorImage } = await uploadImage(
      formData.image[0],
      `image`,
      formData.title,
      supabase,
      'itineraries',
    );

    if (errorImage)
      return handleError(
        errorImage.statusCode === '409'
          ? 'The place already exists'
          : errorImage.message,
      );

    const imagePath = `https://pgbobzpagoauoxbtnxbt.supabase.co/storage/v1/object/public/itineraries/${dataImage.path}`;

    if (itinerary) {
      const { err } = await updateItinerary(
        supabase,
        user.id,
        formData,
        imagePath,
        itinerary.id,
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
    } else {
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
    }
    toast.dismiss(loadingToastId);
    toast.success(`Successfully uploaded: ${formData.title}`);
    if (itinerary) router.push(`/dashboard/itinerary/new`);
    setLoading(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      budget: '',
      visit_period: '',
      city: '',
      street: '',
      categories: [],
      lat: '',
      lng: '',
      sub_categories: [],
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

  const uploadImagePreview = async (file) => {
    setImagePreview(file);
  };

  return (
    <Layout title={'Upload itinerary'} username={user?.user_metadata?.username}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mb-10 w-96"
      >
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
        <FileInput
          name="image"
          inputRef={imageInputRef}
          title="Upload an image for the itinerary"
          handleData={updateImageData}
          handlePreview={uploadImagePreview}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="image preview"
            className="object-cover w-56 overflow-hidden max-h-56"
          />
        )}
        {!imagePreview && formData?.image && (
          <img
            src={formData?.image}
            alt="image preview"
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
            !formData.description ||
            !formData.title ||
            !formData.budget ||
            !formData.visit_period ||
            !formData.street ||
            !formData.lat ||
            !formData.lng ||
            !formData.sub_categories
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
