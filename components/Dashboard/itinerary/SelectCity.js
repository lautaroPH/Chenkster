import FormLabel from '../FormLabel';

const SelectCity = ({ city, cities, itinerary, handleChange }) => {
  return (
    <>
      <FormLabel name="city" title="Select a city" />
      <select
        name="city"
        id="city"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        required
        placeholder="Select a city"
        value={city}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a city
        </option>
        {itinerary && cities.length === 0 && (
          <option key={itinerary.city.id} value={itinerary.city.id}>
            {itinerary.city.title}
          </option>
        )}
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.title}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectCity;
