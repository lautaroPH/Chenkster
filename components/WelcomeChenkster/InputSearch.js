import { searchCountry } from '@/services/get/searchCountry';
import debounce from 'just-debounce-it';
import SearchSvg from '../Svg/SearchSvg';

const InputSearch = ({ setCountries }) => {
  const handleChange = debounce(async (e) => {
    const title = e.target.value;

    if (title) {
      const { data, error } = await searchCountry(title);

      setCountries(data);
    }
  }, 500);

  return (
    <form className="relative">
      <input
        type="search"
        className="h-12 px-4 py-2 mt-5 text-sm border rounded-lg drop-shadow-lg bg-gradient-to-b from-blue-100 to-white w-72 font-lato focus:outline-none focus:ring-2 focus:ring-chenkster-blue focus:border-transparent"
        placeholder="Search"
        onChange={handleChange}
      />
      <div className="absolute bottom-4 right-3">
        <SearchSvg />
      </div>
    </form>
  );
};

export default InputSearch;
