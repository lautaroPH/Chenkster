import AskChenkster from '@/components/AskChenkster';
import ButtonDelete from '@/components/ButtonDelete';
import InfoSection from '@/components/Itinerary/InfoSection';
import ItineraryImage from '@/components/Itinerary/ItineraryImage';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import EditSvg from '@/components/Svg/EditSvg';
import MapPointSvg from '@/components/Svg/MapPointSvg';
import VerificSvg from '@/components/Svg/VerificSvg';
import { deleteItinerary } from '@/utils/deleteItinerary';
import { getItinerary } from '@/utils/getItinerary';
import { getSavedItineraries } from '@/utils/getSavedItineraries';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const { itinerary } = ctx.query;
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
      },
    };
  }

  const { itinerarySaved, itinerarySavedError } = await getSavedItineraries(
    data?.user?.id,
    itineraryData.title,
  );

  if (itinerarySavedError) return { notFound: true };

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
      itinerary: itineraryData,
      itinerarySaved: itinerarySaved.length > 0 ? true : false,
    },
  };
};

export default function Itinerary({ user, itinerary, itinerarySaved }) {
  return (
    <Layout
      title={'Discover the best food'}
      username={user?.user_metadata?.username}
    >
      <div className="mb-5">
        <ItineraryImage
          image={itinerary.image}
          title={itinerary.title}
          country={itinerary.city.country}
          city={itinerary.city.title}
          userId={user?.id}
          itinerarySaved={itinerarySaved}
        />
        <div className="flex items-center justify-center">
          <h2 className="mt-4 mb-2 text-3xl font-bold text-center font-lato text-chenkster-blue">
            {itinerary.title}
          </h2>
          {user?.user_metadata?.role === 'admin' && (
            <>
              <Link
                href={`/dashboard/itinerary/${itinerary.id}`}
                className="mt-2 ml-5 text-yellow-600"
              >
                <EditSvg />
              </Link>
              <ButtonDelete
                title={itinerary.title}
                deleteFunction={deleteItinerary}
                redirect={`/dashboard/itinerary/${itinerary.id}}`}
              />
            </>
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
            {itinerary.city.country}, {itinerary.city.title}
          </p>
        </div>
        <InfoSection title={'Description'} info={itinerary.description} />
        <InfoSection title={'Budget -- $/$$'} info={itinerary.budget} />
        <InfoSection
          title={'Best Visit Period'}
          info={itinerary.visit_period}
        />
        <InfoSection title={'Location'} info={itinerary.street}>
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60117.81005979324!2d-122.40984742585711!3d37.78564847001532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d19dbd10d%3A0x62f31595dfc6dbf0!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1612322660253!5m2!1sen!2sus"
            width="302"
            height="247"
            allowFullScreen=""
            loading="lazy"
          ></iframe> */}
          <Map lat={itinerary.lat} lng={itinerary.lng} />
        </InfoSection>
      </div>
      <AskChenkster />
    </Layout>
  );
}
