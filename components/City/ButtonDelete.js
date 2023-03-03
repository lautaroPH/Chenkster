import { deleteCategory } from '@/utils/deleteCategory';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import DeleteModal from '../Itinerary/DeleteModal';
import DeleteSvg from '../Svg/DeleteSvg';

const ButtonDelete = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    const { data, error } = await deleteCategory(title, supabase);
    if (error) return console.log(error);
    setLoading(false);
    toast.success('Itinerary deleted');
    router.push('/dashboard/itinerary/new');
  };

  return (
    <>
      <button onClick={openModal} className="mt-2 ml-3 text-red-600">
        <DeleteSvg />
      </button>
      <Toaster position="top-center" reverseOrder={false} />
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default ButtonDelete;
