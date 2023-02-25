import LayoutProfile from '@/components/LayoutProfile';
import MessagesProfile from '@/components/Profile/messages/Messages';
import Requests from '@/components/Profile/messages/Requests';
import RingBellSvg from '@/components/Svg/RingBellSvg';
import { supabase } from '@/supabaseClient';
import { getTotalMessages } from '@/utils/getTotalMessages';
import { getTotalMessagesRealtime } from '@/utils/getTotalMessagesRealtime';
import { getUsersAdmin } from '@/utils/getUsersAdmin';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export const getServerSideProps = async (ctx) => {
  const { username } = ctx.query;

  if (!username) return { notFound: true };

  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();
  const { messages, errorMessage } = await getTotalMessages(
    data.user.user_metadata.username,
  );

  if (!data.user)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  if (data.user.user_metadata.username !== username) {
    return {
      redirect: {
        destination: `/profile/${data.user.user_metadata.username}/messages`,
        permanent: false,
      },
    };
  }

  if (messages.length === 0 && data.user.user_metadata.role === 'user') {
    const { data: dataAdmin, error } = await getUsersAdmin();
    return {
      props: {
        user: data.user,
        adminProfiles: dataAdmin,
        messagesLoaded: [],
      },
    };
  }

  return {
    props: {
      initialSession: data.user,
      user: data.user,
      messagesLoaded: messages,
      adminProfiles: null,
    },
  };
};

export default function Messages({ user, messagesLoaded, adminProfiles }) {
  const [requests, setRequests] = useState(false);
  const [messages, setMessages] = useState(messagesLoaded);
  const { user_metadata } = user;

  useEffect(() => {
    const channel = getTotalMessagesRealtime(
      user_metadata.username,
      setMessages,
      messages,
    );

    return () => supabase.removeChannel(channel);
  }, [messages, user_metadata]);

  return (
    <LayoutProfile
      IconRight={RingBellSvg}
      firstOption={'MESSAGES'}
      secondOption={'REQUESTS'}
      avatar={user_metadata?.avatar}
      name={`${user_metadata?.first_name} ${user_metadata?.last_name}`}
      changeFirstContent={() => setRequests(false)}
      changeSecondContent={() => setRequests(true)}
      currentLocation={requests}
      href={`/profile/${user_metadata.username}/messages`}
      username={user_metadata.username}
    >
      {!requests ? (
        <>
          {adminProfiles &&
            messages.length === 0 &&
            adminProfiles.map((adminProfile) => (
              <MessagesProfile
                key={adminProfile.id}
                avatar={adminProfile.avatar}
                first_name={adminProfile.first_name}
                last_name={adminProfile.last_name}
                room={`${adminProfile.username}-${user_metadata.username}`}
              />
            ))}
          {messages?.map((message) => (
            <MessagesProfile
              key={message.id}
              avatar={message.username.avatar}
              first_name={message.username.first_name}
              last_name={message.username.last_name}
              created_at={message.created_at}
              numberMessages={message.messages}
              room={
                user_metadata.role === 'admin'
                  ? `${user_metadata.username}-${message.username.username}`
                  : `${message.username.username}-${user_metadata.username}`
              }
            />
          ))}
        </>
      ) : (
        <>
          <Requests avatar={user_metadata?.avatar} />
          <Requests avatar={user_metadata?.avatar} />
          <Requests avatar={user_metadata?.avatar} />
          <Requests avatar={user_metadata?.avatar} />
          <Requests avatar={user_metadata?.avatar} />
        </>
      )}
    </LayoutProfile>
  );
}
