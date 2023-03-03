/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Country = ({ image, country, comingSoon }) => {
  return (
    <Link passHref href={`/country/${country}`}>
      <li className="flex items-center gap-1 mb-5">
        <img
          className="object-cover w-10 h-5"
          src={image}
          alt={`Flag of ${country}`}
        />
        <p className="text-lg font-semibold font-poppins text-chenkster-gray">
          {country}
        </p>
        {comingSoon && (
          <span className="px-2 py-[2px] ml-2 -mt-2 text-[10px] font-bold text-white rounded-full bg-chenkster-green">
            Coming soon
          </span>
        )}
      </li>
    </Link>
  );
};

export default Country;
