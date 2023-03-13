import Layout from '@/components/Layout';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getCategories } from '@/services/get/getCategories';
import { useRouter } from 'next/router';
import FileInput from '@/components/FileInput';
import { getCountries } from '@/services/get/getCountries';
import { getCountryCities } from '@/services/get/getCountryCities';
import { getItinerary } from '@/services/get/getItinerary';
import { handleEditItinerary } from '@/utils/handleEditItinerary';
import { handleAddItinerary } from '@/utils/handleAddItinerary';
import SelectCategory from '@/components/Dashboard/itinerary/selectCategory';
import SelectSubCategory from '@/components/Dashboard/itinerary/SelectSubCategory';
import { getCoordinates } from '@/utils/getCoordinates';
import SelectCountry from '@/components/Dashboard/itinerary/SelectCountry';
import SelectCity from '@/components/Dashboard/itinerary/SelectCity';
import FormLabel from '@/components/Dashboard/FormLabel';
import ImagePreview from '@/components/Dashboard/ImagePreview';
import Head from 'next/head';

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
  const timestamp = Date.parse(itinerary?.created_at);

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

    if (itineraryData) {
      const ok = await handleEditItinerary(
        itineraryData,
        formData,
        supabase,
        handleError,
        loadingToastId,
        timestamp,
      );

      if (!ok) return;
    } else {
      const ok = await handleAddItinerary(
        formData,
        handleError,
        loadingToastId,
        supabase,
        timestamp,
        user.id,
      );
      if (!ok) return;
    }

    router.push(`/itineraries/uploaded`);
    toast.dismiss(loadingToastId);
    toast.success(`Successfully uploaded: ${formData.title}`);
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
    const { lat, lng } = getCoordinates(url);

    if (lat) {
      setFormData((prev) => ({
        ...prev,
        lat,
        lng,
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
      userId={user?.id}
    >
      <Head>
        <title>
          {itinerary ? 'Edit itinerary' : 'Upload itinerary'} - Chenkster
        </title>
        <meta
          name="description"
          content="Upload your itinerary and share it with the world"
        />
      </Head>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mb-10 w-96"
      >
        <SelectCountry
          countries={countries}
          country={formData.country}
          handleChange={handleChange}
        />
        <SelectCity
          cities={cities}
          city={formData.city}
          handleChange={handleChange}
          itinerary={itinerary}
        />
        <SelectCategory
          categories={categories}
          formCategories={formData.categories}
          setFormData={setFormData}
        />
        <SelectSubCategory
          setFormData={setFormData}
          subCategoriesForm={formData.sub_categories}
          categoriesForm={formData.categories}
        />
        <FormLabel name="title" title="Title" />
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
        <FormLabel name="description" title="Description" />
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="px-2 py-2 text-sm font-medium placeholder-gray-500 bg-transparent border border-gray-400 rounded-lg resize-none placeholder:font-lato font-lato"
          placeholder="Assaje is a famous Pizzeria with Neapolitan origins, which means that the pizza is thick on the side and thin in the..."
          required
        />
        <FormLabel name="budget" title="Budget" />
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
        <FormLabel name="visit_period" title="Visit period" />
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
        <FormLabel name="social_media" title="Social media link" />
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
        <FormLabel name="street" title="Street" />
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
        <FormLabel name="map_url" title="Google Map Url" />
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
        <FormLabel name="front_image" title="Front image" />
        <FileInput
          name="front_image"
          inputRef={frontImageRef}
          title="Upload a front image for the itinerary"
          handleData={updateImageData}
          handlePreview={uploadFrontImagePreview}
        />
        <ImagePreview
          alt={'front image preview'}
          imagePreview={frontImagePreview}
          styles={'object-cover h-40 w-80 rounded-xl'}
        />
        <FormLabel name="detail_image" title="Detail image" />
        <FileInput
          name="detail_image"
          inputRef={detailImageRef}
          title="Upload a detail image for the itinerary"
          handleData={updateImageData}
          handlePreview={uploadDetailImagePreview}
        />
        <ImagePreview
          alt={'detail image preview'}
          imagePreview={detailImagePreview}
          styles={'object-cover w-96 h-60 rounded-2xl'}
        />
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
