import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React from 'react';
import { auth } from './firebase';
import useCurrentUser from './useCurrentUser';

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, provider);

const Auth: React.FC = () => {
  const user = useCurrentUser()

  return <div className='auth-container'>
    {!user && <button className='button' onClick={signInWithGoogle}>SignIn</button>}
    {Boolean(user) && <div>
      <button className="button" onClick={() => signOut(auth)}>Sair</button>
      <p>
        {user?.email}
      </p>
    </div>
    }
  </div>
}

export default Auth;