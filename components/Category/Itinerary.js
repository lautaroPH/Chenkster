/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import VerificSvg from '../Svg/VerificSvg';

const Itinerary = ({ category, city, country, title, budget, image }) => {
  const titleReplace = title.replace(/\s+/g, '-');
  return (
    <Link
      href={`/country/${country}/${city}/${category}/${titleReplace}`}
      className="w-full px-2 py-2 mb-4 bg-transparent shadow rounded-2xl drop-shadow-lg"
    >
      <img
        className="object-cover w-full h-40 rounded-xl"
        src={image}
        alt={`Image of ${title}`}
      />
      <div className="flex items-center justify-between px-3 mt-2">
        <p className="px-3 py-1 text-sm tracking-wider text-center text-white rounded-md bg-gradient font-poppins">
          {title} -- {budget}
        </p>
        <div className="flex items-center justify-center ml-2">
          <div className="mr-1 text-chenkster-green">
            <VerificSvg styles={'w-5 h-5'} />
          </div>
          <p className="text-xs font-semibold font-lato text-chenkster-gray">
            Verified
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Itinerary;
