import Link from 'next/link';
import HomeSvg from './Svg/HomeSvg';
import ItenarySvg from './Svg/ItenarySvg';
import MapPointSvg from './Svg/MapPointSvg';
import MessageSvg from './Svg/MessageSvg';
import PersonSvg from './Svg/PersonSvg';

const NavbarBottom = ({ username }) => {
  return (
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
  );
};

export default NavbarBottom;
