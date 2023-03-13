import Layout from '@/components/Layout';
import { StrictModeDroppable } from '@/components/StrictModeDroppable';
import CityItinerary from '@/components/userItinerary/CityItinerary';
import { getSavedItinerariesOrder } from '@/services/get/getSavedItinerariesOrder';
import { updateOrderCity } from '@/services/update/updateOrderCity';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false },
);

export const getServerSideProps = async (ctx) => {
  resetServerContext();
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/itinerary',
        permanent: false,
      },
    };

  const { itinerarySaved, itinerarySavedError } =
    await getSavedItinerariesOrder(data.user.id);

  if (itinerarySavedError) return { notFound: true };
  const citiesWithItinerary = {};
  itinerarySaved.forEach((obj) => {
    const city = obj.itinerary.city.title;
    if (citiesWithItinerary[city]) {
      citiesWithItinerary[city].push(obj);
    } else {
      citiesWithItinerary[city] = [obj];
    }
  });
  const cities = Object.keys(citiesWithItinerary);

  return {
    props: {
      initialSession: data.user,
      user: data.user,
      itinerarySaved: citiesWithItinerary,
      cities,
    },
  };
};

export default function Itinerary({
  itinerarySaved,
  cities: citiesLoaded,
  user,
}) {
  const [cities, setcities] = useState(citiesLoaded);
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const newCities = [...cities];
    const [reorderedCities] = newCities.splice(result.source.index, 1);
    newCities.splice(result.destination.index, 0, reorderedCities);
    setcities(newCities);

    setLoading(true);
    newCities.forEach(async (city, index) => {
      await updateOrderCity(itinerarySaved[city][0].id, index + 1, supabase);
    });
    setLoading(false);
  };

  return (
    <Layout
      title={'Itineraries'}
      username={user.user_metadata.username}
      role={user?.user_metadata?.role}
      userId={user?.id}
    >
      <Head>
        <title>Chenkster - Itinerary</title>
        <meta name="description" content="Plan your next trip with Chenkster" />
      </Head>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="items">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cities.map((city, index) => (
                <CityItinerary
                  city={city}
                  itinerarySaved={itinerarySaved}
                  key={city}
                  index={index}
                  supabase={supabase}
                  loadingCities={loading}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </Layout>
  );
}
