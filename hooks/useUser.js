import { useState, useEffect } from 'react';
import useSession from './useSession';

const useUser = () => {
  const session = useSession();
  const [user, setUser] = useState(false);
  useEffect(() => setUser(session?.user), [session]);

  return user;
};

export default useUser;
