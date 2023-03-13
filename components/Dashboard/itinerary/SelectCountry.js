import FormLabel from './FormLabel';

const SelectCountry = ({ country, countries, handleChange }) => {
  return (
    <>
      <FormLabel name="country" title="Select a country" />
      <select
        name="country"
        id="country"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        required
        placeholder="Select a country"
        value={country}
        onChange={handleChange}
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
