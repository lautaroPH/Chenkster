import Country from './Country';

const Countries = ({ countries, role }) => {
  return (
    <ul className="w-full mt-5 overflow-y-scroll max-h-36">
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
          role={role}
        />
      ))}
    </ul>
  );
};

export default Countries;
