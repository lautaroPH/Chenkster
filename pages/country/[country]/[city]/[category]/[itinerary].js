import AskChenkster from '@/components/AskChenkster';
import ButtonDelete from '@/components/ButtonDelete';
import InfoSection from '@/components/Itinerary/InfoSection';
import ItineraryImage from '@/components/Itinerary/ItineraryImage';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import SocialIcon from '@/components/SocialIcons';
import MapPointSvg from '@/components/Svg/MapPointSvg';
import PencilEditSvg from '@/components/Svg/PencilEditSvg';
import VerificSvg from '@/components/Svg/VerificSvg';
import { deleteItinerary } from '@/utils/deleteItinerary';
import { getItinerary } from '@/utils/getItinerary';
import { getSavedItineraries } from '@/utils/getSavedItineraries';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const { itinerary, country, city, category } = ctx.query;
  if (!itinerary) return { notFound: true };
  const replaceItinerary = itinerary.replace(/-/g, ' ');
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { itineraryData, err } = await getItinerary(replaceItinerary);

  if (err || !itineraryData?.title) return { notFound: true };

  if (!data?.user?.id) {
    return {
      props: {
        initialSession: data?.user,
        user: data?.user,
        itinerary: itineraryData,
        itinerarySaved: false,
        country,
        city,
        category,
      },
    };
  }

  const { itinerarySaved, itinerarySavedError } = await getSavedItineraries(
    data?.user?.id,
    itineraryData.id,
  );

  if (itinerarySavedError) return { notFound: true };

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
      itinerary: itineraryData,
      itinerarySaved: itinerarySaved.length > 0 ? true : false,
      country,
      city,
      category,
    },
  };
};

export default function Itinerary({
  user,
  itinerary,
  itinerarySaved,
  country,
  city,
  category,
}) {
  return (
    <Layout
      url={`/country/${country}/${city}/${category}`}
      title={'Discover the best food'}
      username={user?.user_metadata?.username}
      role={user?.user_metadata?.role}
    >
      <div className="w-full mb-5 sm:w-4/5">
        <ItineraryImage
          image={itinerary.detail_image}
          title={itinerary.title}
          country={itinerary.country.id}
          city={itinerary.city.id}
          userId={user?.id}
          itinerarySaved={itinerarySaved}
          itineraryId={itinerary.id}
        />
        <div className="flex items-center justify-center">
          <Link href={itinerary.social_media} className="mt-3 mr-5">
            <SocialIcon socialMediaName={itinerary.social_media} />
          </Link>
          <h2 className="mt-4 mb-2 text-3xl font-bold text-center font-lato text-chenkster-blue">
            {itinerary.title}
          </h2>
          {user?.user_metadata?.role === 'admin' && (
            <div className="flex items-center mt-2">
              <Link
                href={`/dashboard/itinerary/${itinerary.title}`}
                className="ml-5 "
              >
                <PencilEditSvg />
              </Link>
              <ButtonDelete
                title={itinerary.title}
                deleteFunction={deleteItinerary}
                redirect={`/dashboard/itinerary/${itinerary.id}}`}
              />
            </div>
          )}
        </div>
        <p className="flex items-center justify-center gap-1 text-sm tracking-wide font-lato text-chenkster-gray">
          <VerificSvg styles={'w-4 h-4'} />
          Verified by{' '}
          <span className="font-semibold">
            {itinerary.user_id.first_name}
          </span>{' '}
        </p>
        <div className="flex items-center justify-center gap-1 mt-2 text-sm font-semibold tracking-wide text-center font-lato text-chenkster-gray">
          <div className="text-chenkster-green">
            <MapPointSvg styles={'w-3 h-4'} />
          </div>
          <p>
            {itinerary.country.title}, {itinerary.city.title}
          </p>
        </div>
        <InfoSection title={'Description'} info={itinerary.description} />
        <InfoSection title={'Budget -- $/$$'} info={itinerary.budget} />
        <InfoSection
          title={'Best Visit Period'}
          info={itinerary.visit_period}
        />
        <InfoSection title={'Location'} info={itinerary.street}>
          <Map lat={itinerary.lat} lng={itinerary.lng} />
        </InfoSection>
      </div>
      <AskChenkster />
    </Layout>
  );
}
