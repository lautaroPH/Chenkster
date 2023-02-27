import Countries from './Countries';
import InputSearch from './InputSearch';
import ShowCountriesBox from './ShowCountriesBox';

const ShowCountries = () => {
  return (
    <div className="text-center transition-all duration-500 ease-in-out bg-white shadow-lg w-80 rounded-t-3xl drop-shadow-2xl shadow-slate-400">
      <div className="flex flex-col items-center justify-center -mt-2">
        <ShowCountriesBox title={'Select a country'} />
        <InputSearch />
        <Countries />
      </div>
    </div>
  );
};

export default ShowCountries;
