import { useState } from 'react';
import Itinerary from './Itinerary';
import dynamic from 'next/dynamic';
import { StrictModeDroppable } from '../StrictModeDroppable';
import { updateOrder } from '@/utils/updateOrder';
const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false },
);
const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false },
);

const CityItinerary = ({
  city,
  itinerarySaved,
  index,
  supabase,
  loadingCities,
}) => {
  const [itineraries, setItineraries] = useState(itinerarySaved);
  const [loading, setLoading] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItineraries = [...itineraries[city]];
    const [reorderedItinerary] = newItineraries.splice(result.source.index, 1);
    newItineraries.splice(result.destination.index, 0, reorderedItinerary);

    setItineraries((prev) => ({
      ...prev,
      [city]: newItineraries,
    }));

    setLoading(true);
    newItineraries.forEach(async (itinerary, index) => {
      await updateOrder(itinerary.id, index + 1, supabase);
    });
    setLoading(false);
  };

  const removeItinerary = (id) => {
    setItineraries((prev) => ({
      ...prev,
      [city]: prev[city].filter((itinerary) => itinerary.id !== id),
    }));
  };

  return (
    <Draggable
      key={city}
      draggableId={city}
      index={index}
      isDragDisabled={loadingCities}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="px-3 py-3 mb-5 bg-transparent border rounded-lg shadow w-80 drop-shadow-lg"
        >
          <div className="w-full p-2" {...provided.dragHandleProps}>
            <h2 className="mb-5 text-2xl font-bold text-center text-chenkster-gray font-lato">
              {city}
            </h2>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <StrictModeDroppable droppableId="items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {itineraries[city].map((itinerary, i) => (
                    <Itinerary
                      categories={itinerary.itinerary_title.categories}
                      city={itinerary.itinerary_title.city}
                      country={itinerary.country}
                      image={itinerary.itinerary_title.image}
                      title={itinerary.itinerary_title.title}
                      key={itinerary.id}
                      index={i}
                      loading={loading}
                      supabase={supabase}
                      userId={itinerary.user_id}
                      removeItinerary={removeItinerary}
                      id={itinerary.id}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      )}
    </Draggable>
  );
};

export default CityItinerary;
