/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import VerificSvg from '../Svg/VerificSvg';

const Category = ({ category, city, country }) => {
  return (
    <Link href={`/country/${country}/${city}/${category}`}>
      <img
        className="object-cover w-36 h-36 rounded-xl"
        src="/images/italy.png"
        alt="Food"
      />
      <div className="flex items-center justify-between px-2 mt-2 h-7">
        <p className="px-3 py-1 text-sm tracking-wider text-center text-white rounded-md bg-gradient font-poppins">
          Eating out
        </p>
        <div className="flex items-center justify-center ml-2">
          <div className="mr-1 text-chenkster-green">
            <VerificSvg />
          </div>
          <p className="text-xs font-semibold font-lato mt-[2px] text-chenkster-gray">
            6
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Category;
