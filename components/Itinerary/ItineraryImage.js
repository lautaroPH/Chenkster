/* eslint-disable @next/next/no-img-element */
import HeartSvg from '../Svg/HeartSvg';

const ItineraryImage = () => {
  return (
    <div className="relative">
      <img
        className="object-cover h-60 rounded-2xl w-96"
        src="/images/italy.png"
        alt="Food"
      />
      <div className="absolute bottom-1 left-1">
        <HeartSvg />
      </div>
    </div>
  );
};

export default ItineraryImage;
