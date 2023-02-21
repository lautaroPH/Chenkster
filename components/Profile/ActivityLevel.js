/* eslint-disable @next/next/no-img-element */

const ActivityLevel = () => {
  return (
    <div className="flex border-t h-[70px] items-center justify-center w-full mt-10 bg-white drop-shadow-xl">
      <img
        src="https://norces.com/wp-content/uploads/sites/12/2021/03/bkn-6001.jpg"
        alt="map"
        className="object-cover mr-2 w-14 h-11"
      />
      <div>
        <p className="font-bold tracking-wide font-poppins">Activity level</p>
        <div className="flex items-center">
          <div className="w-40 h-3 mr-4 bg-gray-800 rounded-full bg-gradient-to-r from-[#2FEA9B] to-[#7FDD53]" />
          <span className="font-semibold tracking-wide font-poppins">95%</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLevel;
