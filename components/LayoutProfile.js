/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import GoBack from './GoBack';
import HomeSvg from './Svg/HomeSvg';
import ItenarySvg from './Svg/ItenarySvg';
import MapPointSvg from './Svg/MapPointSvg';
import MessageSvg from './Svg/MessageSvg';
import PersonSvg from './Svg/PersonSvg';
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
  href,
  username,
}) => {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen mb-20 overflow-hidden">
      <div className="relative flex justify-between w-full px-8 mt-14">
        <GoBack styles="w-6 h-6" />
        <img
          src={avatar ? avatar : '/images/userImg.png'}
          alt="user image"
          className="object-cover w-20 h-20 -mt-3 rounded-full"
        />
        <Link href={href}>
          <IconRight />
        </Link>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-center font-poppins text-chenkster-gray">
        {name}
      </h2>
      <div className="flex items-center justify-between w-2/3 mx-auto mt-6">
        <button
          onClick={changeFirstContent}
          className={`${
            !currentLocation ? 'text-chenkster-blue' : 'text-gray-400'
          } w-full font-semibold tracking-wider border-r border-gray-400 font-lato text-start`}
        >
          {firstOption}
        </button>
        <button
          onClick={changeSecondContent}
          className={`${
            currentLocation ? 'text-chenkster-blue' : 'text-gray-400'
          } font-semibold tracking-wider w-[16.5rem] text-end font-lato`}
        >
          {secondOption}
        </button>
      </div>

      {children}
      <div className="fixed bottom-0 z-30 flex items-center justify-between w-full px-10 pt-2 pb-4 bg-white rounded-t-lg shadow-sm shadow-black drop-shadow-2xl">
        <Link href={'/'}>
          <MapPointSvg />
        </Link>
        <Link href={'/'}>
          <ItenarySvg />
        </Link>
        <Link className="p-2 rounded-full bg-chenkster-blue" href={'/welcome'}>
          <HomeSvg />
        </Link>
        <Link href={'/'}>
          <MessageSvg />
        </Link>
        <Link href={`/profile/${username}`}>
          <PersonSvg />
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <WorldLightSvg />
      </div>
    </div>
  );
};

export default LayoutProfile;
