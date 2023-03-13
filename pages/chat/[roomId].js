import Messages from '@/components/Chat/Messages';
import ProfileTop from '@/components/Chat/ProfileTop';
import SendMessage from '@/components/Chat/SendMessage';
import NavbarBottom from '@/components/NavbarBottom';
import WorldLightSvg from '@/components/Svg/WorldLightSvg';
import { createChannel } from '@/services/realtime/createChannel';
import { resetTotalMessages } from '@/services/delete/deleteTotalMessages';
import { getMessages } from '@/services/get/getMessages';
import { getTotalMessage } from '@/services/get/getTotalMessage';
import { getUserProfile } from '@/services/get/getUserProfile';
import { subscribeUserOnline } from '@/services/realtime/subscribeUserOnline';
import { userIsOnline } from '@/services/realtime/userIsOnline';
import { userLeave } from '@/services/realtime/userLeave';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';

export async function getServerSideProps(ctx) {
  const { roomId } = ctx.query;

  if (!roomId) return { notFound: true };
  const supabase = createServerSupabaseClient(ctx);

  const { data, error } = await getUserProfile(roomId);
  if (error || !data?.role) return { notFound: true };

  const { data: currentUser } = await supabase.auth.getUser();

  if (!currentUser.user)
    return {
      redirect: {
        destination: `/login?callbackUrl=/chat/${roomId}`,
        permanent: false,
      },
    };

  if (currentUser.user.user_metadata?.role === 'user' && data.role === 'user') {
    return { notFound: true };
  }
  if (currentUser.user.user_metadata?.username === roomId)
    return { notFound: true };

  const bothUsers =
    currentUser.user.user_metadata?.role === 'user'
      ? `${roomId}-${currentUser.user.user_metadata?.username}`
      : `${currentUser.user.user_metadata?.username}-${roomId}`;

  const { messages, errorMessage } = await getMessages(bothUsers);

  const messagesDeleted = await resetTotalMessages(
    data.user_id,
    currentUser.user.id,
    supabase,
  );

  if (errorMessage) return { notFound: true };

  const { totalMessages } = await getTotalMessage(
    currentUser.user.id,
    data.user_id,
  );

  return {
    props: {
      messagesLoaded: messages,
      room: roomId,
      user: currentUser.user,
      both_users: bothUsers,
      totalMessages: totalMessages ? totalMessages.messages : 'Not messages',
      toUser: data,
    },
  };
}

export default function Chat({
  messagesLoaded,
  room,
  user,
  both_users,
  totalMessages,
  toUser,
}) {
  const messagesEndRef = useRef();
  const supabase = useSupabaseClient();
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState(totalMessages);

  const handleOnline = (userOnline) => {
    setIsOnline(userOnline);
  };

  const resetMessages = () => {
    setMessages(0);
  };

  useEffect(() => {
    const channel = createChannel(both_users, supabase);

    userIsOnline(channel, handleOnline);
    userLeave(channel, resetMessages);
    subscribeUserOnline(channel);

    return () => supabase.removeChannel(channel);
  }, [supabase, both_users]);

  return (
    <div className="relative flex flex-col items-center w-full h-screen max-w-2xl m-auto">
      <ProfileTop
        avatar={toUser.avatar}
        first_name={toUser.first_name}
        last_name={toUser.last_name}
        isOnline={isOnline}
      />
      <Messages
        both_users={both_users}
        endRef={messagesEndRef}
        messagesLoaded={messagesLoaded}
        room={room}
        supabase={supabase}
        username={user?.user_metadata?.username}
      />
      <SendMessage
        toUserId={toUser.user_id}
        both_users={both_users}
        endRef={messagesEndRef}
        supabase={supabase}
        userId={user?.id}
        isOnline={isOnline}
        setMessages={setMessages}
        messages={messages}
      />
      <NavbarBottom
        username={user?.user_metadata?.username}
        role={user?.user_metadata?.role}
        userId={user?.id}
      />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center m-auto -z-30">
        <WorldLightSvg />
      </div>
    </div>
  );
}
