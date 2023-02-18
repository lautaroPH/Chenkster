import { useState } from 'react';
import SelectCountry from './SelectCountry';
import ShowCountriesBox from './ShowCountriesBox';

const ShowCountries = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenCountrySelect = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div
      className={`${
        openMenu ? '-bottom-5' : 'bottom-[-329px]'
      } fixed w-80 h-96 rounded-3xl z-20 text-center drop-shadow-2xl shadow-slate-400 shadow-lg bg-white transition-all duration-500 ease-in-out `}
    >
      <div className="flex flex-col items-center justify-center -mt-2">
        {openMenu ? (
          <SelectCountry handleOpenCountrySelect={handleOpenCountrySelect} />
        ) : (
          <ShowCountriesBox
            handleOpenCountrySelect={handleOpenCountrySelect}
            title={'Click to select a country'}
          />
        )}
      </div>
    </div>
  );
};

export default ShowCountries;
