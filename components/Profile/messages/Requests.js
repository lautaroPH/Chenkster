/* eslint-disable @next/next/no-img-element */
import CrossSvg from '@/components/Svg/CrossSvg';

const Requests = ({ avatar, name }) => {
  return (
    <div className="relative flex items-center justify-between w-4/5 px-3 py-3 bg-transparent shadow mt-7 rounded-xl drop-shadow-lg">
      <div className="flex items-center">
        <img
          className="object-cover rounded-full w-11 h-11"
          src={avatar}
          alt="profile avatar"
        />
        <p className="ml-3 text-sm font-semibold font-poppins text-chenkster-gray">
          {name}
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="text-black">
          <CrossSvg />
        </div>
        <span className="font-poppins text-[9px] mt-2 mb-1 font-semibold text-chenkster-gray">
          Today
        </span>
        <button className="px-2 py-2 text-xs text-white rounded-md bg-gradient font-poppins">
          Accept
        </button>
      </div>
    </div>
  );
};

export default Requests;
