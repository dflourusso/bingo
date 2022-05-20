import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from './firebase';
import useCurrentUser from './useCurrentUser';

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, provider);

const Auth: React.FC = () => {
  const user = useCurrentUser()

  return <div>
    {!user && <div onClick={signInWithGoogle}>SignIn</div>}
    {Boolean(user) && <div >{user?.email}</div>}
  </div>
}

export default Auth;