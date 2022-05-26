import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Auth from '../components/Auth'
import Button from '../components/Button'
import useCurrentUser from '../hooks/useCurrentUser'

const Home: React.FC = () => {
  const { loading, user } = useCurrentUser()
  const [followGameUid, setFollowGameUid] = useState('')
  const navigate = useNavigate()

  if (loading) return <div className='center-screen'><div className='loading'></div></div>

  return (
    <div className='center-screen'>
      <h2>Bingo</h2>
      <div className='home-divider'></div>
      {Boolean(user) && <>
        <div className='home-content'>
          <Link to={{ pathname: `/game/${user?.uid}` }} className='button'>Iniciar</Link>
          <div className="home-info"><small>Inicie um novo jogo ou continue um jogo já existente</small></div>
        </div>
        <div className='home-divider'></div>
        <div className='home-content'>
          <div className='home-input-group'>
            <input type='text' placeholder='Digite o código do jogo' onChange={(event) => setFollowGameUid(event.target.value)} />
          </div>
          <Button onClick={() => { navigate(`/game/${followGameUid}`) }} disabled={!followGameUid}>Acompanhar</Button>
          <div className="home-info"><small>Acompanhe o jogo de um amigo em tempo real</small></div>
        </div>
        <div className='home-divider'></div>
      </>}

      <Auth />
    </div>
  )
}

export default Home
