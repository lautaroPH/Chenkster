/* eslint-disable @next/next/no-img-element */
import { deleteCity } from '@/utils/deleteCity';
import Link from 'next/link';
import ButtonDelete from '../ButtonDelete';

const City = ({ country, city, description, image, role }) => {
  const cityReplace = city.replace(/\s+/g, '-');
  const replaceCountry = country.replace(/-/g, ' ');

  return (
    <div className="flex items-center w-full py-4 mt-10 bg-transparent shadow-xl h-28 drop-shadow-md rounded-2xl">
      <img
        src={image}
        alt={`Image of ${city}`}
        className="object-cover mr-2 h-28 w-28 rounded-2xl"
      />
      <div className="flex flex-col items-center justify-end">
        <h3 className="text-xl font-bold font-lato text-chenkster-gray">
          {city}
        </h3>
        <p className="text-xs font-medium text-center w-[203px] font-lato text-chenkster-gray">
          {description}
        </p>
        <div className="flex">
          <Link
            href={`/country/${replaceCountry}/${cityReplace}`}
            className="px-4 py-[1px] mt-2 text-sm font-medium tracking-widest text-white rounded-full font-lato bg-gradient"
          >
            Visit
          </Link>
          {role === 'admin' && (
            <ButtonDelete
              title={city}
              deleteFunction={deleteCity}
              redirect={`/dashboard/city`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default City;
