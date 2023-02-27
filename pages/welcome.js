import WorldLightSvg from '@/components/Svg/WorldLightSvg';
import GoBack from '@/components/GoBack';
import ChenksterLogo from '@/components/ChenksterLogo';
import ShowCountries from '@/components/WelcomeChenkster/ShowCountries';

export default function Welcome() {
  return (
    <div className="relative flex flex-col items-center w-full overflow-hidden">
      <GoBack styles={'absolute top-16 left-8'} />

      <ChenksterLogo />

      <h1 className="mt-8 text-4xl font-bold tracking-widest text-center text-chenkster-blue font-lato drop-shadow-sm w-60">
        Welcome to Chenkster!
      </h1>
      <p className="my-12 text-3xl font-semibold text-center font-lato text-chenkster-gray w-60">
        Find the <span className="text-chenkster-green">best suggestions</span>{' '}
        for your next trip in{' '}
        <span className="text-chenkster-green">only 3 clicks</span>
      </p>

      <ShowCountries />

      <div className="absolute bottom-0 left-0 right-0 -z-30">
        <WorldLightSvg />
      </div>
    </div>
  );
}
