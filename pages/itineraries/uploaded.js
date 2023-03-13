import Layout from '@/components/Layout';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getUserItineraries } from '@/services/get/getUserItineraries';
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
      role={user?.user_metadata?.role}
      userId={user?.id}
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
              //reemplazar el espacio por el - en category
              category={place.categories[0].replace(/\s+/g, '-')}
              city={place.city.title.replace(/\s+/g, '-')}
              country={place.country.title.replace(/\s+/g, '-')}
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
