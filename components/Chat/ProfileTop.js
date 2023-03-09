/* eslint-disable @next/next/no-img-element */

import GoBack from '../GoBack';
import ThreePointSvg from '../Svg/ThreePointSvg';

const ProfileTop = ({ avatar, first_name, last_name, isOnline }) => {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 my-4 bg-white">
      <div className="flex items-center">
        <div className="mr-4">
          <GoBack />
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 mr-2 rounded-full"
            src={avatar}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-chenkster-gray font-lato">
              {first_name} {last_name}
            </span>
            {isOnline && (
              <span className="text-xs font-normal text-green-500">Online</span>
            )}
          </div>
        </div>
      </div>
      <div>
        <ThreePointSvg />
      </div>
    </div>
  );
};

export default ProfileTop;
