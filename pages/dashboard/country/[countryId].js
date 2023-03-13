import FormLabel from '@/components/Dashboard/FormLabel';
import ImagePreview from '@/components/Dashboard/ImagePreview';
import FileInput from '@/components/FileInput';
import Layout from '@/components/Layout';
import { getCountry } from '@/services/get/getCountry';
import { handleAddCountry } from '@/utils/handleAddCountry';
import { handleEditCountry } from '@/utils/handleEditCountry';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
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
        destination: '/login?callbackUrl=/dashboard/country/new',
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

  const timestamp = Date.parse(country?.created_at);
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

    if (countryData) {
      const ok = await handleEditCountry(
        countryData,
        formData,
        handleError,
        loadingToastId,
        supabase,
        timestamp,
        user.id,
      );

      if (!ok) return;
    } else {
      const ok = await handleAddCountry(
        formData,
        handleError,
        loadingToastId,
        supabase,
        timestamp,
        user.id,
      );
      if (!ok) return;
    }

    router.push('/welcome');
    toast.dismiss(loadingToastId);
    toast.success(`Successfully edited: ${formData.country}`);
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
      title={country ? 'Edit Country' : 'Upload Country'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
      userId={user?.id}
    >
      <Head>
        <title>{country ? 'Edit Country' : 'Upload Country'} - Chenkster</title>
        <meta
          name="description"
          content="Edit or upload a new country to the website"
        />
      </Head>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-96"
      >
        <FormLabel name="country" title="Country" />
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
        <FormLabel name="flag" title="Flag" />
        <FileInput
          name="flag"
          inputRef={flagInputRef}
          title="Upload a flag picture"
          handleData={updateImageData}
          handlePreview={uploadFlagPreview}
        />
        <ImagePreview
          alt="flag image country"
          imagePreview={flagPreview}
          styles="object-cover w-10 h-5"
        />
        <FormLabel name="bg_image" title="Background image" />
        <FileInput
          name="bg_image"
          inputRef={bgImageInputRef}
          title="Upload a background image"
          handleData={updateImageData}
          handlePreview={uploadBgPreview}
        />
        <ImagePreview
          alt="Background image country"
          imagePreview={bgImagePreview}
          styles="object-cover w-80 h-72"
        />
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
