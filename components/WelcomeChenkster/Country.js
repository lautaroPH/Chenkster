/* eslint-disable @next/next/no-img-element */
import { deleteCountry } from '@/utils/deleteCountry';
import Link from 'next/link';
import ButtonDelete from '../ButtonDelete';

const Country = ({ image, country, role }) => {
  return (
    <li className="flex items-center justify-between w-full px-5 mb-5">
      <Link
        passHref
        href={`/country/${country}`}
        className="flex items-center gap-1"
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
        <div>
          <ButtonDelete
            title={country}
            deleteFunction={deleteCountry}
            redirect={`/dashboard/country`}
          />
        </div>
      )}
    </li>
  );
};

export default Country;
