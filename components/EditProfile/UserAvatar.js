/* eslint-disable @next/next/no-img-element */

import PlusSvg from '../Svg/PlusSvg';

const UserAvatar = ({ imagePreview, userImage, profileImgRef }) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-[145px] h-[142px] overflow-hidden">
        <img
          src={imagePreview ? imagePreview : userImage}
          alt="User Image"
          className="object-cover w-[145px] h-[142px] overflow-hidden rounded-full"
        />
      </div>
      <button
        onClick={() => profileImgRef.current.click()}
        type="button"
        className="absolute bottom-0 right-32"
      >
        <PlusSvg />
      </button>
    </div>
  );
};

export default UserAvatar;
