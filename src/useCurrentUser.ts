import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from './firebase';

const useCurrentUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (p) => {
      setUser(p)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return user;
}

export default useCurrentUser