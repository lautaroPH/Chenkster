/* eslint-disable @next/next/no-img-element */
import { deleteCountry } from '@/utils/deleteCountry';
import Link from 'next/link';
import ButtonDelete from '../ButtonDelete';
import PencilEditSvg from '../Svg/PencilEditSvg';

const Country = ({ image, country, role, id }) => {
  return (
    <li className="flex items-center justify-between w-full px-5 mb-5">
      <Link
        passHref
        href={`/country/${country}`}
        className="flex items-center w-full gap-1"
      >
        <img
          className="object-cover w-10 h-5"
          src={image}
          alt={`Flag of ${country}`}
        />
        <p className="text-lg font-semibold font-poppins text-chenkster-gray">
          {country}
        </p>
      </Link>
      {role === 'admin' && (
        <div className="flex items-center">
          <Link
            passHref
            href={`/dashboard/country/${country}`}
            className="mb-1"
          >
            <PencilEditSvg />
          </Link>
          <div>
            <ButtonDelete
              title={country}
              id={id}
              deleteFunction={deleteCountry}
              redirect={`/dashboard/country/new`}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default Country;
