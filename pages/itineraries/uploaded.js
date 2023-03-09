import Layout from '@/components/Layout';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getUserItineraries } from '@/utils/getUserItineraries';
import Itinerary from '@/components/Category/Itinerary';
import AddSvg from '@/components/Svg/AddSvg';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  if (data.user.user_metadata.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { itineraries, err } = await getUserItineraries(data.user.id);

  if (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: data.user,
      user: data.user,
      itineraries,
    },
  };
};

export default function Profile({ user, itineraries }) {
  return (
    <Layout
      url={'/dashboard/itinerary/new'}
      title={'Your published contents'}
      username={user?.user_metadata?.username}
    >
      {!itineraries || itineraries?.length === 0 ? (
        <p className="my-5 font-bold font-lato text-chenkster-gray">
          No itineraries found
        </p>
      ) : (
        <>
          {itineraries?.map((place) => (
            <Itinerary
              key={place.id}
              category={place.categories[0].replace(/-/g, ' ')}
              city={place.city.replace(/-/g, ' ')}
              country={place.country.replace(/-/g, ' ')}
              title={place.title}
              budget={place.budget}
              image={place.front_image}
            />
          ))}
          <Link href={'/dashboard/itinerary/new'}>
            <AddSvg />
          </Link>
        </>
      )}
    </Layout>
  );
}
