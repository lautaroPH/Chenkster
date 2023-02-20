import DiscoverCountry from '@/components/Country/DiscoverCountry';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Milan from '@/public/images/milan.png';
import WorldLightSvg from '@/components/Svg/WorldLightSvg';
import Layout from '@/components/Layout';

export default function Country() {
  const router = useRouter();
  const { country } = router.query;

  return (
    <Layout title={'Select the city'}>
      <DiscoverCountry country={country} />

      <div className="flex items-center justify-between w-4/5 h-[93px] mt-10 bg-white shadow-xl drop-shadow-md rounded-2xl">
        <Image src={Milan} alt="Milan" />
        <div className="flex flex-col items-center justify-center w-40 pl-2">
          <h3 className="text-xl font-bold font-lato text-chenkster-gray">
            Milan
          </h3>
          <p className="text-xs font-medium text-center w-[203px] font-lato text-chenkster-gray">
            Discover the most modern city in Italy, capital of business and
            fashion!
          </p>
          <a className="px-4 py-[1px] mt-1 text-sm font-medium tracking-widest text-white rounded-full font-lato bg-gradient">
            Visit
          </a>
        </div>
      </div>
    </Layout>
  );
}
