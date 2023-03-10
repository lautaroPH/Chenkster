import { useState } from 'react';
import Countries from './Countries';
import InputSearch from './InputSearch';
import ShowCountriesBox from './ShowCountriesBox';

const ShowCountries = ({ countries: countriesLoaded, role }) => {
  const [countries, setCountries] = useState(countriesLoaded);
  return (
    <div className="text-center transition-all duration-500 ease-in-out bg-transparent shadow-lg mb-28 max-h-96 w-80 rounded-3xl drop-shadow-2xl shadow-slate-400">
      <div className="flex flex-col items-center justify-center -mt-2">
        <ShowCountriesBox title={'Select a country'} />
        <InputSearch setCountries={setCountries} />
        <Countries countries={countries} role={role} />
      </div>
    </div>
  );
};

export default ShowCountries;
