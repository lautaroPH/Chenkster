import { useState } from 'react';
import FeatureComingModal from './FeatureComingModal';
import LightBulbSvg from './Svg/LightBulbSvg';

const ButtonLightBulb = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button onClick={() => setIsOpen(true)}>
      <LightBulbSvg />
      <FeatureComingModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </button>
  );
};

export default ButtonLightBulb;
