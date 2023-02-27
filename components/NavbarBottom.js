import Link from 'next/link';
import { useRouter } from 'next/router';
import HomeSvg from './Svg/HomeSvg';
import ItenarySvg from './Svg/ItenarySvg';
import MapPointSvg from './Svg/MapPointSvg';
import MessageSvg from './Svg/MessageSvg';
import PersonSvg from './Svg/PersonSvg';
import SelectedNavSvg from './Svg/SelectedNavSvg';

const NavbarBottom = ({ username }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="fixed bottom-0 z-30 flex items-center justify-between w-full px-10 pt-2 pb-4 bg-white rounded-t-lg shadow-sm shadow-black drop-shadow-2xl">
      <Link
        href={'/welcome'}
        className="flex flex-col items-center justify-center text-chenkster-blue"
      >
        <MapPointSvg styles={'w-5 h-7'} />
        <div className="mt-1 -mb-2">
          {pathname === '/welcome' && <SelectedNavSvg />}
        </div>
      </Link>
      <Link
        href={'/bookmark'}
        className="flex flex-col items-center justify-center"
      >
        <ItenarySvg />
        <div className="mt-1 -mb-2">
          {pathname === '/bookmark' && <SelectedNavSvg />}
        </div>
      </Link>
      <Link
        className="flex flex-col items-center justify-center p-2 pb-3 rounded-full bg-chenkster-blue"
        href={'/'}
      >
        <HomeSvg />
        <div className="mt-4 -mb-5">
          {pathname === '/' && <SelectedNavSvg />}
        </div>
      </Link>
      <Link
        href={`/profile/options/messages`}
        className="flex flex-col items-center justify-center"
      >
        <MessageSvg />
        <div className="mt-1 -mb-2">
          {pathname === '/profile/options/messages' && <SelectedNavSvg />}
        </div>
      </Link>
      <Link
        href={username ? `/profile/${username}` : `/login`}
        className="flex flex-col items-center justify-center"
      >
        <PersonSvg />
        <div className="mt-1 -mb-2">
          {pathname === `/profile/[username]` && <SelectedNavSvg />}
        </div>
      </Link>
    </div>
  );
};

export default NavbarBottom;
