import FormLabel from '../FormLabel';

const SelectCountry = ({ handleChange, countryId, countries }) => {
  return (
    <>
      <FormLabel title={'Country'} name="country_id" />
      <select
        name="country_id"
        id="country_id"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        required
        placeholder="Select a country"
        onChange={handleChange}
        value={countryId}
      >
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.title}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectCountry;
