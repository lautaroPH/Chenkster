import Countries from './Countries';
import InputSearch from './InputSearch';
import ShowCountriesBox from './ShowCountriesBox';

const SelectCountry = ({ handleOpenCountrySelect }) => {
  return (
    <>
      <ShowCountriesBox
        handleOpenCountrySelect={handleOpenCountrySelect}
        title={'Select a country'}
      />
      <InputSearch />
      <Countries />
    </>
  );
};

export default SelectCountry;
