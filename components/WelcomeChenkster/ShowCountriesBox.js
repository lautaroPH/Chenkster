import RectangleSvg from '../Svg/RectangleSvg';

const ShowCountriesBox = ({ title }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full text-center cursor-pointer">
        <RectangleSvg />
      </div>
      <p className="-mt-5 text-lg font-bold cursor-pointer text-chenkster-blue font-lato">
        {title}
      </p>
    </>
  );
};

export default ShowCountriesBox;
