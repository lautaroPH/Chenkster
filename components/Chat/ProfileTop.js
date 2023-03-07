/* eslint-disable @next/next/no-img-element */

const ProfileTop = ({ avatar, first_name, last_name }) => {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 bg-white border-b border-gray-300">
      <div className="flex items-center">
        <img
          className="w-10 h-10 mr-4 rounded-full"
          src={avatar}
          alt="avatar"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">
            {first_name}
          </span>
          <span className="text-xs font-normal text-gray-500">{last_name}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
