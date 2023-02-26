import Link from 'next/link';

const City = ({ country, city }) => {
  return (
    <Link
      href={`/country/${country}/${city}`}
      className="flex items-center w-4/5 py-4 mt-10 bg-transparent shadow-xl h-28 drop-shadow-md rounded-2xl"
    >
      <img
        src="/images/italy.png"
        alt="Milan"
        className="object-cover mr-2 h-28 w-28 rounded-2xl"
      />
      <div className="flex flex-col items-center justify-end">
        <h3 className="text-xl font-bold font-lato text-chenkster-gray">
          Milan
        </h3>
        <p className="text-xs font-medium text-center w-[203px] font-lato text-chenkster-gray">
          Discover the most modern city in Italy, capital of business and
          fashion!
        </p>
        <a className="px-4 py-[1px] mt-2 text-sm font-medium tracking-widest text-white rounded-full font-lato bg-gradient">
          Visit
        </a>
      </div>
    </Link>
  );
};

export default City;
