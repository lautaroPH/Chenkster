import ButtonRingBell from '@/components/ButtonRingBell';
import LayoutProfile from '@/components/LayoutProfile';
import MessagesProfile from '@/components/Profile/messages/Messages';
import Requests from '@/components/Profile/messages/Requests';
import { supabase } from '@/supabaseClient';
import { getTotalMessages } from '@/services/get/getTotalMessages';
import { getTotalMessagesRealtime } from '@/services/realtime/getTotalMessagesRealtime';
import { getUsersAdmin } from '@/services/get/getUsersAdmin';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data } = await supabase.auth.getUser();

  if (!data.user)
    return {
      redirect: {
        destination: '/login?callbackUrl=/profile/options/messages',
        permanent: false,
      },
    };

  const { messages, errorMessage } = await getTotalMessages(data.user.id);

  if (messages?.length === 0 && data.user.user_metadata?.role === 'user') {
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
      user.id,
    );

    return () => supabase.removeChannel(channel);
  }, [messages, user_metadata, user]);

  return (
    <LayoutProfile
      IconRight={ButtonRingBell}
      firstOption={'MESSAGES'}
      secondOption={'REQUESTS'}
      avatar={user_metadata?.avatar}
      name={`${user_metadata?.first_name} ${user_metadata?.last_name}`}
      changeFirstContent={() => setRequests(false)}
      changeSecondContent={() => setRequests(true)}
      currentLocation={requests}
      href={`/profile/options/messages`}
      username={user_metadata.username}
      role={user_metadata.role}
      userId={user.id}
    >
      <Head>
        <title>{!requests ? 'Messages' : 'Requests'} - Chenkster</title>
        <meta
          name="description"
          content="Chat with Chenkster users and admins"
        />
      </Head>
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
                room={adminProfile.username}
              />
            ))}
          {messages?.map((message) => (
            <MessagesProfile
              key={message.id}
              avatar={message.user_id.avatar}
              first_name={message.user_id.first_name}
              last_name={message.user_id.last_name}
              created_at={message.created_at}
              numberMessages={message.messages}
              room={message.user_id.username}
            />
          ))}
        </>
      ) : (
        <>
          {user_metadata.username === 'super admin' ? (
            <>
              <Requests
                avatar={
                  'https://dam.muyinteresante.com.mx/wp-content/uploads/2018/05/fotos-de-perfil-son-mejor-elegidas-por-personas-extranas-afirma-estudio.jpg'
                }
                name={'Jhon Doe'}
              />
              <Requests
                avatar={
                  'https://media.licdn.com/dms/image/C4D03AQFnohQzlY-XZw/profile-displayphoto-shrink_800_800/0/1624180767804?e=2147483647&v=beta&t=Vn6jKnvsAMS4C3WOX-3dkodb7wnJLezTpDhpPxbMjm8'
                }
                name={'Richard Dawson'}
              />
              <Requests
                avatar={
                  'https://i1.wp.com/www.viviendoencasa.mx/wp-content/uploads/2021/05/%C2%BFPor-que%CC%81-hay-personas-que-quitan-su-foto-de-WhatsApp-cuando-se-enojan_-1.jpg?resize=1280%2C720&ssl=1'
                }
                name={'Olivia Wikky'}
              />
              <Requests
                avatar={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTozd34MECljztW9OxdJUlN5mplgr1flFz9yA&usqp=CAU'
                }
                name={'Dianne Russell'}
              />
              <Requests
                avatar={
                  'https://i0.wp.com/thehappening.com/wp-content/uploads/2017/07/foto-perfil-5.jpg?resize=1024%2C694&ssl=1'
                }
                name={'Henry McKinney'}
              />
            </>
          ) : (
            <div className="py-4 w-4/5 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#7bb6f469] to-slate-100  mt-10 mb-10 rounded-lg">
              <p className="font-semibold tracking-wider text-center font-lato text-chenkster-gray">
                We are currently working on this feature. Please check back
                later.
              </p>
            </div>
          )}
        </>
      )}
    </LayoutProfile>
  );
}
