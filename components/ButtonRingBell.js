import { useState } from 'react';
import FeatureComingModal from './FeatureComingModal';
import RingBellSvg from './Svg/RingBellSvg';

const ButtonRingBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(true)}>
      <RingBellSvg />
      <FeatureComingModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </button>
  );
};

export default ButtonRingBell;
