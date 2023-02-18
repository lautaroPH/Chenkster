import Buttons from './Buttons';

const InfoChenkster = () => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center mt-16">
      <h2 className="text-2xl font-semibold text-center w-80 font-lato">
        Chenkster aims to{' '}
        <span className="text-chenkster-blue">make travel easier</span> for
        every young traveler in the world by{' '}
        <span className="text-chenkster-blue">reducing research time</span> and{' '}
        <span className="text-chenkster-blue">
          providing top quality information!
        </span>
      </h2>
      <p className="w-64 mt-16 text-xl font-extrabold text-center font-lato text-chenkster-gray">
        Are you looking for information for your trip?
      </p>
      <Buttons />
    </div>
  );
};

export default InfoChenkster;
