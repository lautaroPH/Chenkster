/* eslint-disable @next/next/no-img-element */

import VerificSvg from '../Svg/VerificSvg';

const Itinerary = () => {
  return (
    <div className="w-full px-2 py-2 mb-4 bg-transparent shadow rounded-2xl drop-shadow-lg">
      <img
        className="object-cover h-40 w-80 rounded-xl"
        src="/images/italy.png"
        alt="Food"
      />
      <div className="flex items-center justify-between px-3 mt-2">
        <p className="px-3 py-1 text-sm tracking-wider text-center text-white rounded-md bg-gradient font-poppins">
          Assaje -- $$
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
    </div>
  );
};

export default Itinerary;