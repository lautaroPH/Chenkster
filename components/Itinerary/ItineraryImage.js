/* eslint-disable @next/next/no-img-element */
import { deleteSavedItinerary } from '@/utils/deleteSavedItinerary';
import { uploadSavedItinerary } from '@/utils/uploadSavedItinerary';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import HeartSvg from '../Svg/HeartSvg';

const ItineraryImage = ({
  image,
  title,
  userId,
  itinerarySaved,
  country,
  city,
}) => {
  const [isSaved, setIsSaved] = useState(itinerarySaved);
  const supabase = useSupabaseClient();

  const handleSaveItinerary = async () => {
    if (!userId)
      return toast.error('You must be logged in to save itineraries');

    if (isSaved) {
      const { data, error } = await deleteSavedItinerary(
        userId,
        title,
        supabase,
      );

      if (error) return alert(error.message);
      setIsSaved(false);
    } else {
      const { data, error } = await uploadSavedItinerary(
        userId,
        title,
        country,
        city,
        supabase,
      );

      if (error) return alert(error.message);
      setIsSaved(true);
    }
  };

  return (
    <div className="relative">
      <img
        className="object-cover w-full h-60 rounded-2xl"
        src={image}
        alt={`Image of ${title}`}
      />
      <button
        onClick={handleSaveItinerary}
        className="absolute text-white bottom-1 left-1"
      >
        <HeartSvg styles={'w-12 h-12'} fill={isSaved ? '#fff' : 'none'} />
      </button>
      <Toaster position="top-center" />
    </div>
  );
};

export default ItineraryImage;
