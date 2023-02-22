/* eslint-disable @next/next/no-img-element */
const MessagesProfile = ({ avatar_url }) => {
  return (
    <div className="flex items-center justify-between w-4/5 px-3 py-3 bg-transparent shadow mt-7 rounded-xl drop-shadow-lg">
      <div className="flex items-center">
        <img
          className="object-cover rounded-full w-11 h-11"
          src={avatar_url}
          alt="profile avatar"
        />
        <p className="ml-3 text-sm font-semibold font-poppins text-chenkster-gray">
          Dean Patel
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="bg-[#3CD24B] rounded-full w-7 h-7 text-center text-white pt-[1px]">
          2
        </p>
        <span className="font-poppins text-[9px] mt-3 font-semibold text-chenkster-gray">
          Today
        </span>
      </div>
    </div>
  );
};

export default MessagesProfile;
