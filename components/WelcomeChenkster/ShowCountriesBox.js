import RectangleSvg from '../Svg/RectangleSvg';

const ShowCountriesBox = ({ handleOpenCountrySelect, title }) => {
  return (
    <>
      <div
        onClick={handleOpenCountrySelect}
        onMouseDown={handleOpenCountrySelect}
        onMouseUp={handleOpenCountrySelect}
        className="flex flex-col items-center justify-center w-full text-center cursor-pointer"
      >
        <RectangleSvg />
      </div>
      <p
        onClick={handleOpenCountrySelect}
        className="-mt-5 text-lg font-bold cursor-pointer text-chenkster-blue font-lato"
      >
        {title}
      </p>
    </>
  );
};

export default ShowCountriesBox;
