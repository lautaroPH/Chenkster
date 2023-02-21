import MeasurerSvg from '../Svg/MeasurerSvg';

const Views = () => {
  return (
    <div className="flex items-center w-4/5 px-5 py-2 bg-transparent shadow-lg rounded-xl mt-7 drop-shadow-xl">
      <MeasurerSvg />
      <div className="ml-5">
        <h4 className="flex items-center text-xl font-semibold font-lato text-chenkster-gray">
          2459{' '}
          <span className="ml-3 text-sm font-medium text-chenkster-green">
            +19%
          </span>
        </h4>
        <p className="text-sm text-chenkster-gray">
          Content views in the past 90 days
        </p>
      </div>
    </div>
  );
};

export default Views;
