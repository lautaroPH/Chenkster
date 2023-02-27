import Image from 'next/image';

const DiscoverCountry = ({ country }) => {
  const countryFileImg = country?.split(' ').join('').toLowerCase();

  return (
    <div className="flex flex-col items-center justify-center text-white bg-center bg-no-repeat bg-cover drop-shadow-xl bg-italy rounded-3xl w-80 h-72">
      <h2 className="text-4xl font-lato">
        Discover{' '}
        <p className="flex items-center gap-2 font-bold">
          {country?.toUpperCase()}{' '}
          {country && (
            <Image
              src={`/images/${countryFileImg}Flag.png`}
              alt={country}
              width={46}
              height={31}
            />
          )}
        </p>{' '}
      </h2>
      <p className="mt-10 text-center w-72">
        Our chenksters are experts at providing high quality advice for the best
        places, experiences and activities.
      </p>
    </div>
  );
};

export default DiscoverCountry;
