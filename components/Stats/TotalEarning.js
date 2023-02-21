import DollarSvg from '../Svg/DollarSvg';

const TotalEarning = () => {
  return (
    <div className="flex items-center justify-between w-4/5 py-3 mt-10 bg-white px-7 drop-shadow-md rounded-xl">
      <div>
        <h4 className="text-lg font-semibold font-lato text-chenkster-gray">
          Total Earning
        </h4>
        <p className="flex items-center text-2xl font-bold text-chenkster-blue font-lato">
          $321.55{' '}
          <span className="ml-3 text-sm font-medium text-chenkster-green">
            +3.5%
          </span>
        </p>
        <p className="text-xs font-bold font-lato text-chenkster-blue">
          $CHENK 311.38
        </p>
      </div>
      <div>
        <DollarSvg />
      </div>
    </div>
  );
};

export default TotalEarning;
