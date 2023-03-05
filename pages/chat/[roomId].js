import Messages from '@/components/Chat/Messages';
import SendMessage from '@/components/Chat/SendMessage';
import { deleteTotalMessages } from '@/utils/deleteTotalMessages';
import { getMessages } from '@/utils/getMessages';
import { getTotalMessage } from '@/utils/getTotalMessage';
import { getUserProfile } from '@/utils/getUserProfile';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef } from 'react';

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

  const bothUsers =
    currentUser.user.user_metadata?.role === 'user'
      ? `${roomId}-${currentUser.user.user_metadata?.username}`
      : `${currentUser.user.user_metadata?.username}-${roomId}`;

  const { messages, errorMessage } = await getMessages(bothUsers);

  const messagesDeleted = await deleteTotalMessages(
    data.username,
    currentUser.user.user_metadata.username,
    supabase,
  );

  if (errorMessage) return { notFound: true };

  const { totalMessages } = await getTotalMessage(
    currentUser.user.user_metadata?.username,
    roomId,
  );

  return {
    props: {
      messagesLoaded: messages,
      room: roomId,
      user: currentUser.user,
      both_users: bothUsers,
      totalMessages: totalMessages?.messages ? totalMessages.messages : 0,
    },
  };
}

export default function Chat({
  messagesLoaded,
  room,
  user,
  both_users,
  totalMessages,
}) {
  const messagesEndRef = useRef();
  const supabase = useSupabaseClient();

  return (
    <div className="flex flex-col w-full h-screen bg-gray-200">
      <Messages
        both_users={both_users}
        endRef={messagesEndRef}
        messagesLoaded={messagesLoaded}
        room={room}
        supabase={supabase}
        username={user?.user_metadata?.username}
      />
      <SendMessage
        room={room}
        both_users={both_users}
        endRef={messagesEndRef}
        supabase={supabase}
        username={user?.user_metadata?.username}
        totalMessages={totalMessages}
      />
    </div>
  );
}
