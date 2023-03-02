import DiscoverCountry from '@/components/Country/DiscoverCountry';
import Layout from '@/components/Layout';
import City from '@/components/Country/City';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getCountry } from '@/utils/getCountry';
import { getCountryCities } from '@/utils/getCountryCities';

export const getServerSideProps = async (ctx) => {
  const { country } = ctx.query;
  if (!country) return { notFound: true };
  const replaceCountry = country.replace(/-/g, ' ');
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  const { countryData, err } = await getCountry(replaceCountry);

  if (err || !countryData) return { notFound: true };

  const { cities, error } = await getCountryCities(replaceCountry);

  if (error || cities.length === 0) return { notFound: true };

  return {
    props: {
      initialSession: data?.user,
      user: data?.user,
      cities,
      country: countryData,
    },
  };
};

export default function Country({ user, cities, country }) {
  return (
    <Layout title={'Select the city'} username={user?.user_metadata?.username}>
      <DiscoverCountry
        country={country.title}
        bgImage={country.bg_image}
        flag={country.flag}
      />
      <div className="mb-10">
        {cities.map((city) => (
          <City
            key={city.id}
            country={city.country}
            city={city.title}
            description={city.description}
            image={city.image}
          />
        ))}
      </div>
    </Layout>
  );
}
