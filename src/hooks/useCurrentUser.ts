import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../firebase';

interface UseCurrentUserResponse {
  loading: boolean;
  user: User | null
}

const useCurrentUser = (): UseCurrentUserResponse => {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (p) => {
      setUser(p)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return { loading, user };
}

export default useCurrentUser