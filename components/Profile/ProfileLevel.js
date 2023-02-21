const ProfileLevel = () => {
  return (
    <div className="flex flex-col w-4/5 px-5 py-5 mt-10 bg-transparent border shadow drop-shadow-xl rounded-xl">
      <div className="flex items-center w-full">
        <p className="mr-3 py-1 bg-[#212E5B] rounded-full text-[#FFDD64] text-center px-3 text-xl">
          4
        </p>
        <div>
          <p className="text-xl font-semibold text-chenkster-gray">Level 4/9</p>
          <p className="-mt-2 text-sm font-semibold text-gray-400">
            800 Points to next level
          </p>
        </div>
      </div>
      <div className="flex w-full h-7 mt-2 items-center bg-gradient-to-r from-[#3CD23B] to-[#9ef1a6] rounded-full -z-10">
        <p className="bg-[#3CD24B] rounded-full text-white text-center px-2 text-lg drop-shadow-md z-20">
          4
        </p>
        <p className="flex items-center justify-end font-lato font-semibold text-sm text-chenkster-gray opacity-80 bg-gradient-to-r w-full h-7 from-[#3CD23B] to-[#86f191] rounded-full drop-shadow-lg text-end pr-3 mr-12 z-10 -ml-5">
          5000<span className="opacity-100 text-chenkster-gray">/6000</span>
        </p>
        <p className="bg-[#75df80] rounded-full text-white text-center px-2 text-lg drop-shadow-md z-20">
          5
        </p>
      </div>
    </div>
  );
};

export default ProfileLevel;
