import WorldLightSvg from '@/components/Svg/WorldLightSvg';
import GoBack from '@/components/GoBack';
import ChenksterLogo from '@/components/ChenksterLogo';
import ShowCountries from '@/components/WelcomeChenkster/ShowCountries';
import { getCountriesLimit } from '@/utils/getCountriesLimit';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import NavbarBottom from '@/components/NavbarBottom';

export const getServerSideProps = async (ctx) => {
  const { countries, err } = await getCountriesLimit();
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (err) return { notFound: true };

  return {
    props: {
      countries,
      initialSession: data?.user,
      user: data?.user,
    },
  };
};

export default function Welcome({ countries, user }) {
  return (
    <div className="relative flex flex-col items-center justify-between w-full min-h-screen overflow-hidden">
      <GoBack
        styles={
          'absolute top-16 left-8 sm:left-40 md:left-60 lg:left-96 xl:left-[30rem]'
        }
      />

      <ChenksterLogo />

      <h1 className="mt-8 text-4xl font-bold tracking-widest text-center text-chenkster-blue font-lato drop-shadow-sm w-60">
        Welcome to Chenkster!
      </h1>
      <p className="my-12 text-3xl font-semibold text-center font-lato text-chenkster-gray w-60">
        Find the <span className="text-chenkster-green">best suggestions</span>{' '}
        for your next trip in{' '}
        <span className="text-chenkster-green">only 3 clicks</span>
      </p>

      <ShowCountries countries={countries} role={user?.user_metadata?.role} />

      <NavbarBottom
        username={user?.user_metadata?.username}
        role={user?.user_metadata?.role}
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center m-auto -z-30">
        <WorldLightSvg />
      </div>
    </div>
  );
}
