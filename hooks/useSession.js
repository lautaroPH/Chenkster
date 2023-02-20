import { supabase } from '@/supabaseClient';
import { eventsUser } from '@/utils/eventUser';
import { useState, useEffect } from 'react';

const useSession = () => {
  const [session, setSession] = useState(false);
  const getOnAuthStateChange = () => {
    supabase.auth.onAuthStateChange((event, actualSession) => {
      if (event === eventsUser.SIGNED_IN) {
        setSession(actualSession);
      } else if (event === eventsUser.SIGNED_OUT) {
        setSession(null);
      }
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      setSession(data.session);
      getOnAuthStateChange();
    });
  }, []);

  return session;
};

export default useSession;
