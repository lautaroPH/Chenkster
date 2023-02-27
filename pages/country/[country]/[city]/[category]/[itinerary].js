import AskChenkster from '@/components/AskChenkster';
import InfoSection from '@/components/Itinerary/InfoSection';
import ItineraryImage from '@/components/Itinerary/ItineraryImage';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import MapPointSvg from '@/components/Svg/MapPointSvg';
import VerificSvg from '@/components/Svg/VerificSvg';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
    },
  };
};

export default function Itinerary({ user }) {
  return (
    <Layout
      title={'Discover the best food'}
      username={user?.user_metadata?.username}
    >
      <div className="mb-5">
        <ItineraryImage />
        <h2 className="mt-4 mb-2 text-3xl font-bold text-center font-lato text-chenkster-blue">
          Assaje
        </h2>
        <p className="flex items-center justify-center gap-1 text-sm tracking-wide font-lato text-chenkster-gray">
          <VerificSvg styles={'w-4 h-4'} />
          Verified by <span className="font-semibold">
            Stephanie and 2
          </span>{' '}
          more chenksters
        </p>
        <p className="flex items-center justify-center gap-1 mt-2 text-sm font-semibold tracking-wide text-center font-lato text-chenkster-gray">
          <div className="text-chenkster-green">
            <MapPointSvg styles={'w-3 h-4'} />
          </div>
          Milan, Italy
        </p>
        <InfoSection
          title={'Description'}
          info={
            'Assaje is a famous Pizzeria with Neapolitan origins, which means that the pizza is thick on the side and thin in the center. Service is super fast and no reservations are possible.'
          }
        />
        <InfoSection title={'Budget -- $/$$'} info={'8-12€ per pizza'} />
        <InfoSection
          title={'Best Visit Period'}
          info={
            'Lunch time 12:30 or dinner 20:00, because Italians are coming 30-45 minutes later and you will have to wait for 1 hour'
          }
        />
        <InfoSection
          title={'Location'}
          info={'Via Traù, 2, 20159 Milano MI, Italy'}
        >
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60117.81005979324!2d-122.40984742585711!3d37.78564847001532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d19dbd10d%3A0x62f31595dfc6dbf0!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1612322660253!5m2!1sen!2sus"
            width="302"
            height="247"
            allowFullScreen=""
            loading="lazy"
          ></iframe> */}
          <Map />
        </InfoSection>
      </div>
      <AskChenkster />
    </Layout>
  );
}
