import { useTimeAgo } from '@/hooks/useTimeAgo';
import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
const MessagesProfile = ({
  avatar,
  first_name,
  last_name,
  created_at,
  numberMessages,
  room,
}) => {
  const timeInMiliseconds = new Date(created_at).getTime();
  const timeAgo = useTimeAgo(timeInMiliseconds);
  return (
    <Link
      className="flex items-center justify-between w-4/5 px-3 py-3 bg-transparent shadow mt-7 rounded-xl drop-shadow-lg"
      href={`/chat/${room}`}
      passHref
    >
      <div className="flex items-center">
        <img
          className="object-cover rounded-full w-11 h-11"
          src={avatar}
          alt="profile avatar"
        />
        <p className="ml-3 text-sm font-semibold font-poppins text-chenkster-gray">
          {first_name} {last_name}
        </p>
      </div>
      {numberMessages > 0 && (
        <div className="flex flex-col items-end justify-center">
          <p className="bg-[#3CD24B] rounded-full w-7 h-7 text-center text-white pt-[1px]">
            {numberMessages}
          </p>
          {created_at && (
            <span className="font-poppins text-[9px] mt-3 font-semibold text-chenkster-gray">
              {timeAgo}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default MessagesProfile;
