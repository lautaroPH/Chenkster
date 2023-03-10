/* eslint-disable @next/next/no-img-element */

import { deleteSavedItinerary } from '@/utils/deleteSavedItinerary';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import HeartSvg from '../Svg/HeartSvg';
import ShareSvg from '../Svg/ShareSvg';
import TrashSvg from '../Svg/TrashSvg';
const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false },
);

const Itinerary = ({
  image,
  title,
  categories,
  country,
  city,
  index,
  loading,
  supabase,
  userId,
  removeItinerary,
  id,
}) => {
  const countryReplace = country.replace(/\s/g, '-');
  const cityReplace = city.replace(/\s/g, '-');
  const titleReplace = title.replace(/\s/g, '-');
  const categoriesReplace = categories[0].replace(/\s/g, '-');

  const url = `/country/${countryReplace}/${cityReplace}/${categoriesReplace}/${titleReplace}`;
  const handleDeleteItinerary = async () => {
    const { data, error } = await deleteSavedItinerary(userId, title, supabase);

    if (error) return alert(error.message);
    removeItinerary(id);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://chenkster.vercel.app${url}`);
    toast.success(
      `Copied to clipboard:\n https://chenkster.vercel.app\n${url}`,
    );
  };

  return (
    <>
      <Draggable
        key={title}
        draggableId={title}
        index={index}
        isDragDisabled={loading}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex w-full px-3 py-3 mb-5 bg-transparent rounded-lg shadow drop-shadow-lg"
          >
            <img
              src={image}
              alt={`Image of ${title}`}
              className="object-cover mr-4 rounded-lg w-28"
            />
            <div>
              <h4 className="text-sm font-bold font-lato text-chenkster-gray">
                {title}
              </h4>
              <p className="mt-4 text-xs font-semibold font-lato text-chenkster-gray">
                Country: <span>{country}</span>
              </p>
              <p className="mt-1 text-xs font-semibold font-lato text-chenkster-gray">
                Category: <span>{categories.join(', ')}</span>
              </p>
              <div className="flex items-center gap-4 mt-3">
                <Link
                  href={url}
                  className="px-3 py-1 text-white rounded-lg bg-gradient"
                >
                  View
                </Link>
                <div className="flex items-center justify-center gap-3">
                  <div
                    onClick={handleDeleteItinerary}
                    className="text-chenkster-blue"
                  >
                    <TrashSvg />
                  </div>
                  <div onClick={handleCopyUrl}>
                    <ShareSvg />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <Toaster position="top-center" />
    </>
  );
};

export default Itinerary;
