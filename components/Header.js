import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import GoBack from './GoBack';
import LightBulbSvg from './Svg/LightBulbSvg';

const Header = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <header className="flex items-center justify-between w-4/5 mt-10">
      <GoBack />
      <h4 className="text-lg font-bold font-lato text-chenkster-blue">
        {title}
      </h4>
      <button onClick={() => setOpenModal(true)}>
        <LightBulbSvg />
      </button>
      <FeedbackModal isOpen={openModal} setIsOpen={setOpenModal} />
    </header>
  );
};

export default Header;
