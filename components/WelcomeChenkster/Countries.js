import Country from './Country';

const Countries = ({ countries }) => {
  return (
    <ul className="mt-5 overflow-y-scroll w-72 max-h-36">
      {countries.length === 0 && (
        <p className="mb-3 text-lg font-semibold font-poppins text-chenkster-gray">
          No results
        </p>
      )}
      {countries.map((country) => (
        <Country
          key={country.id}
          image={country.flag}
          country={country.title}
        />
      ))}
    </ul>
  );
};

export default Countries;
