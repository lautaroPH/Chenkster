import LayoutProfile from '@/components/LayoutProfile';
import MessagesProfile from '@/components/Profile/messages/Messages';
import Requests from '@/components/Profile/messages/Requests';
import CrossSvg from '@/components/Svg/CrossSvg';
import RingBellSvg from '@/components/Svg/RingBellSvg';
import useSession from '@/hooks/useSession';
import useUser from '@/hooks/useUser';
import { getUserProfile } from '@/utils/getUserProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps({ query }) {
  const { username } = query;

  if (!username) return { notFound: true };

  const { data, error } = await getUserProfile(username);

  if (error) {
    console.log('error', error);
    return { notFound: true };
  }

  if (!data[0]) return { notFound: true };

  return { props: { userProfile: data[0] } };
}

export default function Messages({ userProfile }) {
  const [requests, setRequests] = useState(false);
  const session = useSession();
  const router = useRouter();
  const user = useUser();

  if (session === null) {
    router.push(`/login`);
  }

  if (user && user?.user_metadata?.username !== userProfile.username) {
    router.push(`/profile/${user?.user_metadata?.username}/messages`);
  }

  return (
    <>
      {user?.user_metadata?.username === userProfile.username && (
        <LayoutProfile
          IconRight={RingBellSvg}
          firstOption={'MESSAGES'}
          secondOption={'REQUESTS'}
          avatar={userProfile?.avatar_url}
          name={`${userProfile?.first_name} ${userProfile?.last_name}`}
          changeFirstContent={() => setRequests(false)}
          changeSecondContent={() => setRequests(true)}
          currentLocation={requests}
          href={`/profile/${userProfile.username}/messages`}
        >
          {!requests ? (
            <>
              <MessagesProfile avatar_url={userProfile?.avatar_url} />
              <MessagesProfile avatar_url={userProfile?.avatar_url} />
              <MessagesProfile avatar_url={userProfile?.avatar_url} />
              <MessagesProfile avatar_url={userProfile?.avatar_url} />
              <MessagesProfile avatar_url={userProfile?.avatar_url} />
              <MessagesProfile avatar_url={userProfile?.avatar_url} />
            </>
          ) : (
            <>
              <Requests avatar_url={userProfile?.avatar_url} />
              <Requests avatar_url={userProfile?.avatar_url} />
              <Requests avatar_url={userProfile?.avatar_url} />
              <Requests avatar_url={userProfile?.avatar_url} />
              <Requests avatar_url={userProfile?.avatar_url} />
            </>
          )}
        </LayoutProfile>
      )}
    </>
  );
}
