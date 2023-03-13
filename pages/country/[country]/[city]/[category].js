import AskChenkster from '@/components/AskChenkster';
import Itinerary from '@/components/Category/Itinerary';
import ModalPreferences from '@/components/Category/ModalPreferences';
import Layout from '@/components/Layout';
import PreferencesSvg from '@/components/Svg/PreferencesSvg';
import ShufleSvg from '@/components/Svg/ShufleSvg';
import { getCity } from '@/services/get/getCity';
import { getItineraries } from '@/services/get/getItineraries';
import { getItinerariesWithPreferenes } from '@/services/get/getItinerariesWithPreferenes';
import { getPreferences } from '@/services/get/getPreferences';
import { getRandomItineraries } from '@/services/get/getRandomItineraries';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export const getServerSideProps = async (ctx) => {
  const { category, country, city } = ctx.query;
  if (!category || !country || !city) return { notFound: true };
  const categoryReplace = category.replace(/-/g, ' ');
  const cityReplace = city.replace(/-/g, ' ');

  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { preferences } = await getPreferences(categoryReplace);

  const { city: cities } = await getCity(cityReplace);
  const { places, error } = await getItineraries(cities.id, categoryReplace);
  if (error) return { notFound: true };

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
      places,
      category,
      preferences,
      country,
      city,
    },
  };
};

export default function Category({
  user,
  places,
  category,
  preferences,
  country,
  city,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [itineraries, setItineraries] = useState(places);
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [range, setRange] = useState(3);

  const categoryReplace = category.replace(/-/g, ' ');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { itineraries, error } = await getItinerariesWithPreferenes(
      itineraries[0]?.city?.id,
      checkedOptions,
      categoryReplace,
    );

    setItineraries(itineraries);
    setOpenModal(false);
  };

  const handleShuffle = async () => {
    const { itineraries, error } = await getRandomItineraries(
      itineraries[0]?.city?.id,
      checkedOptions,
      categoryReplace,
      range + 3,
    );
    setRange(range + 3);
    setItineraries(itineraries);
  };

  return (
    <Layout
      url={`/country/${country}/${city}`}
      title={'Explore our top suggestions'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
      userId={user?.id}
    >
      <div className="flex items-center justify-center">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center px-2 py-1 mr-5 text-white rounded-lg gap-x-2 bg-gradient"
        >
          Preferences <PreferencesSvg />
        </button>
        <button
          onClick={handleShuffle}
          className="flex items-center justify-center px-2 py-1 text-white rounded-lg gap-x-2 bg-gradient"
        >
          Shuffle <ShufleSvg />
        </button>
      </div>
      {!itineraries || itineraries?.length === 0 ? (
        <p className="my-5 font-bold font-lato text-chenkster-gray">
          No itineraries found
        </p>
      ) : (
        <>
          <p className="my-5 font-bold font-lato text-chenkster-gray">
            Best 3 picks for you
          </p>

          {itineraries?.map((place) => (
            <Itinerary
              key={place.id}
              category={category}
              city={city}
              country={country}
              title={place.title}
              budget={place.budget}
              image={place.front_image}
            />
          ))}
        </>
      )}

      <AskChenkster />
      <ModalPreferences
        openModal={openModal}
        setOpenModal={setOpenModal}
        preferences={preferences}
        handleSubmit={handleSubmit}
        checkedOptions={checkedOptions}
        setCheckedOptions={setCheckedOptions}
      />
    </Layout>
  );
}
