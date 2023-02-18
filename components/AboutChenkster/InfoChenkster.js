import Buttons from './Buttons';

const InfoChenkster = () => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center mt-16">
      <p className="text-2xl font-semibold text-center w-80 font-lato">
        Chenkster aims to{' '}
        <span className="text-[#0973E1]">make travel easier</span> for every
        young traveler in the world by{' '}
        <span className="text-[#0973E1]">reducing research time</span> and{' '}
        <span className="text-[#0973E1]">
          providing top quality information!
        </span>
      </p>
      <p className="mt-16 font-lato text-[#212E5B] font-extrabold text-xl w-64 text-center">
        Are you looking for information for your trip?
      </p>
      <Buttons />
    </div>
  );
};

export default InfoChenkster;
