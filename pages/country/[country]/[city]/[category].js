import AskChenkster from '@/components/AskChenkster';
import Itinerary from '@/components/Category/Itinerary';
import Layout from '@/components/Layout';
import PreferencesSvg from '@/components/Svg/PreferencesSvg';
import ShufleSvg from '@/components/Svg/ShufleSvg';
import { getItineraries } from '@/utils/getItineraries';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = async (ctx) => {
  const { category, country, city } = ctx.query;
  if (!category || !country || !city) return { notFound: true };
  const categoryReplace = category.replace(/-/g, ' ');
  const cityReplace = city.replace(/-/g, ' ');
  const countryReplace = country.replace(/-/g, ' ');

  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { places, error } = await getItineraries(
    cityReplace,
    countryReplace,
    categoryReplace,
  );
  if (error) return { notFound: true };

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
      places,
      category,
    },
  };
};

export default function Category({ user, places, category }) {
  return (
    <Layout
      title={'Explore our top suggestions'}
      username={user?.user_metadata?.username}
    >
      <div className="flex items-center justify-center">
        <button className="flex items-center justify-center px-2 py-1 mr-5 text-white rounded-lg gap-x-2 bg-gradient">
          Preferences <PreferencesSvg />
        </button>
        <button className="flex items-center justify-center px-2 py-1 text-white rounded-lg gap-x-2 bg-gradient">
          Shuffle <ShufleSvg />
        </button>
      </div>
      <p className="my-5 font-bold font-lato text-chenkster-gray">
        Best 3 picks for you
      </p>

      {places.map((place) => (
        <Itinerary
          key={place.id}
          category={category}
          city={place.city}
          country={place.country}
          title={place.title}
          budget={place.budget}
          image={place.image}
        />
      ))}
      <AskChenkster />
    </Layout>
  );
}
