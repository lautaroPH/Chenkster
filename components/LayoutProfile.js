/* eslint-disable @next/next/no-img-element */
import GoBack from './GoBack';
import NavbarBottom from './NavbarBottom';
import WorldLightSvg from './Svg/WorldLightSvg';

const LayoutProfile = ({
  children,
  IconRight,
  firstOption,
  secondOption,
  name,
  avatar,
  changeFirstContent,
  changeSecondContent,
  currentLocation,
  username,
  url,
  role,
}) => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-2xl min-h-screen m-auto mb-20 overflow-hidden">
      <div className="relative flex justify-between w-full px-8 mt-14">
        <GoBack styles="w-6 h-6" url={url} />
        <img
          src={avatar ? avatar : '/images/userImg.png'}
          alt="user image"
          className="object-cover w-20 h-20 -mt-3 rounded-full"
        />
        <IconRight />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-center font-poppins text-chenkster-gray">
        {name}
      </h2>
      <div className="flex items-center justify-center mx-auto mt-6 w-72 sm:w-96">
        <button
          onClick={changeFirstContent}
          className={`${
            !currentLocation ? 'text-chenkster-blue' : 'text-gray-400'
          } flex-1 font-semibold tracking-wider font-lato text-start`}
        >
          {firstOption}
        </button>
        <div className="absolute flex-grow h-8 border-l border-gray-400"></div>
        <button
          onClick={changeSecondContent}
          className={`${
            currentLocation ? 'text-chenkster-blue' : 'text-gray-400'
          } flex-1 font-semibold tracking-wider text-end font-lato`}
        >
          {secondOption}
        </button>
      </div>
      {children}
      <NavbarBottom username={username} role={role} />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center m-auto -z-30">
        <WorldLightSvg />
      </div>
    </div>
  );
};

export default LayoutProfile;
