import Itinerary from '@/components/Category/Itinerary';
import Layout from '@/components/Layout';
import PreferencesSvg from '@/components/Svg/PreferencesSvg';
import ShufleSvg from '@/components/Svg/ShufleSvg';
import VerificSvg from '@/components/Svg/VerificSvg';

export default function Category() {
  return (
    <Layout title={'Explore our top suggestions'}>
      <div className="flex items-center justify-center">
        <button className="flex items-center justify-center px-2 py-1 mr-5 text-white rounded-lg gap-x-2 bg-gradient">
          Preferences <PreferencesSvg />
        </button>
        <button className="flex items-center justify-center px-2 py-1 text-white rounded-lg gap-x-2 bg-gradient">
          Shuffle <ShufleSvg />
        </button>
      </div>
      <p className="my-5 font-bold font-lato text-chenkster-gray">
        Best 3 picks for you
      </p>

      <div>
        <Itinerary />
        <Itinerary />
        <Itinerary />
      </div>

      <div className="py-4 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#9bc5f3] to-slate-100  mt-4 mb-10 rounded-lg">
        <p className="font-semibold tracking-wider text-center font-lato text-chenkster-gray">
          Looking for something more specific?
        </p>
        <button className="px-2 py-1 mt-4 tracking-wider text-white bg-gradient rounded-xl font-lato">
          Ask a chenkster
        </button>
      </div>
    </Layout>
  );
}
