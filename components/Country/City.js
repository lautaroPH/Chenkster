/* eslint-disable @next/next/no-img-element */
import { deleteCity } from '@/utils/deleteCity';
import Link from 'next/link';
import ButtonDelete from '../ButtonDelete';
import PencilEditSvg from '../Svg/PencilEditSvg';

const City = ({ country, city, description, image, role, id }) => {
  const cityReplace = city.replace(/\s+/g, '-');
  const replaceCountry = country.replace(/-/g, ' ');

  return (
    <div className="flex items-center w-full h-32 py-4 mt-10 bg-transparent shadow-xl drop-shadow-md rounded-2xl">
      <img
        src={image}
        alt={`Image of ${city}`}
        className="object-cover h-32 mr-2 w-28 rounded-2xl"
      />
      <div className="flex flex-col items-center justify-end">
        <h3 className="text-xl font-bold font-lato text-chenkster-gray">
          {city}
        </h3>
        <p className="text-xs font-medium text-center w-[203px] font-lato text-chenkster-gray">
          {description}
        </p>
        <div className="flex items-center mt-2">
          <Link
            href={`/country/${replaceCountry}/${cityReplace}`}
            className="px-4 py-[1px] text-sm font-medium tracking-widest text-white rounded-full font-lato bg-gradient"
          >
            Visit
          </Link>
          {role === 'admin' && (
            <>
              <Link href={`/dashboard/city/${city}`} className="ml-2">
                <PencilEditSvg />
              </Link>
              <ButtonDelete
                title={city}
                id={id}
                deleteFunction={deleteCity}
                redirect={`/dashboard/city`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default City;
