/* eslint-disable @next/next/no-img-element */
import { deleteCategory } from '@/utils/deleteCategory';
import Link from 'next/link';
import ButtonDelete from '../ButtonDelete';
import VerificSvg from '../Svg/VerificSvg';

const Category = ({ category, city, country, image, role, id }) => {
  const categoryReplace = category.replace(/\s+/g, '-');

  return (
    <div>
      <Link href={`/country/${country}/${city}/${categoryReplace}`}>
        <img
          className="object-cover w-36 h-36 rounded-xl"
          src={image}
          alt={`Image of ${category}`}
        />
        <div className="flex items-center justify-between px-2 mt-2 h-7">
          <p className="px-3 py-1 text-sm tracking-wider text-center text-white rounded-md bg-gradient font-poppins">
            {category}
          </p>
          <div className="flex items-center justify-center ml-2">
            <div className="mr-1 text-chenkster-green">
              <VerificSvg styles={'w-3 h-3'} />
            </div>
          </div>
        </div>
      </Link>
      {role === 'admin' && (
        <ButtonDelete
          title={category}
          deleteFunction={deleteCategory}
          redirect={`/dashboard/category`}
        />
      )}
    </div>
  );
};

export default Category;
