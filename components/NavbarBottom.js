import { getLastMessage } from '@/services/realtime/getLastMessage';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeartSvg from './Svg/HeartSvg';
import HomeSvg from './Svg/HomeSvg';
import ItenarySvg from './Svg/ItenarySvg';
import MapPointSvg from './Svg/MapPointSvg';
import MessageSvg from './Svg/MessageSvg';
import PersonSvg from './Svg/PersonSvg';
import RedPointSvg from './Svg/RedPointSvg';
import SelectedNavSvg from './Svg/SelectedNavSvg';

const NavbarBottom = ({ username, role, userId }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { pathname } = router;

  const [message, setMessage] = useState();

  useEffect(() => {
    if (!username) return;
    const channel = getLastMessage(username, setMessage, userId);

    return () => supabase.removeChannel(channel);
  }, [username, supabase, userId]);

  return (
    <div className="fixed bottom-0 z-30 flex items-center justify-between w-full px-10 pt-2 pb-4 bg-white rounded-t-lg shadow-sm sm:w-96 shadow-black drop-shadow-2xl">
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
        href={role === 'admin' ? '/dashboard' : '/itinerary'}
        className="flex flex-col items-center justify-center"
      >
        {role === 'admin' ? (
          <>
            <ItenarySvg />
            <div className="mt-1 -mb-2">
              {pathname === '/dashboard' && <SelectedNavSvg />}
            </div>
          </>
        ) : (
          <>
            <div className="text-chenkster-blue">
              <HeartSvg styles={'w-8 h-8'} />
            </div>
            <div className="mt-1 -mb-2">
              {pathname === '/itinerary' && <SelectedNavSvg />}
            </div>
          </>
        )}
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
        className="relative flex flex-col items-center justify-center"
      >
        {message && (
          <div className="absolute -right-1 -top-1">
            <RedPointSvg />
          </div>
        )}
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
