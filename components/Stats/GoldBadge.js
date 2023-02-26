import CheckSvg from '../Svg/CheckSvg';

const GoldBadge = () => {
  return (
    <div className="flex items-center w-4/5 px-5 py-2 bg-transparent shadow-lg rounded-xl mt-7 drop-shadow-xl">
      <div className="text-[#DBAE10] mr-3">
        <CheckSvg styles={'w-14 h-14'} />
      </div>
      <div>
        <h4 className="font-lato text-chenkster-gray">
          Earn <span className="font-semibold">Gold badge </span>for next Level
        </h4>
        <p className="-mt-1 text-sm text-gray-400">Reward: 500 points</p>
      </div>
    </div>
  );
};

export default GoldBadge;
