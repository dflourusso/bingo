import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase';
import useCurrentUser from '../../hooks/useCurrentUser';
import './index.css'

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, provider);

const Auth: React.FC = () => {
  const { user } = useCurrentUser()

  return <div className='auth-container'>
    {!user && <div>
      <p className='auth-do-sign-in'><small>Faça login para continuar</small></p>
      <button className='button' onClick={signInWithGoogle}>Entrar</button>
    </div>
    }
    {Boolean(user) && <div>
      <small>Você está logado como:</small>
      <p className='auth-email'>
        {user?.email}
      </p>
      <button className="button" onClick={() => signOut(auth)}>Sair</button>
    </div>
    }
  </div>
}

export default Auth;