import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './Auth';
import Rock from './components/Rock';
import RockContainer from './components/RockContainer';
import { database } from './firebase';
import useGameUid from './hooks/useGameId';
import jokes from './jokes';
import useCurrentUser from './hooks/useCurrentUser';

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const allRocks = Array(75).fill(null).map((_, index) => index + 1)

function App() {
  const user = useCurrentUser()
  const uid = useGameUid()
  const databasePath = `users/${uid}/game`
  const [pickedRocks, setPickedRocks] = useState<number[]>([])
  const unpicked = allRocks.filter(p => !pickedRocks?.includes(p)) ?? []
  const lastPicked = pickedRocks?.slice(0, 3) ?? []
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const isOwner = user?.uid === uid
  const lastRock = lastPicked[0]
  const joke = jokes[lastRock]

  useEffect(() => {
    if (!uid && user?.uid) {
      window.location.search = `uid=${user?.uid}`
    }
  }, [uid, user])

  const addPickedRock = (rock: number) => {
    set(ref(database, databasePath), [rock, ...pickedRocks]);
  }

  const pickRock = () => {
    const pickIndex = randomIntFromInterval(0, unpicked.length - 1)
    addPickedRock(unpicked[pickIndex])
    setSubmitDisabled(true)
    setTimeout(() => {
      setSubmitDisabled(false)
    }, 1000)
  }

  useEffect(() => {
    const unsubscribe = onValue(ref(database, databasePath), (snapshot) => {
      if (snapshot) {
        const data = snapshot.val();
        setPickedRocks(data ?? []);
      }
    });
    return () => {
      unsubscribe()
    }
  }, [databasePath])

  const resetGame = () => {
    if (window.confirm('Tem certeza que deseja redefinir o jogo?')) {
      set(ref(database, databasePath), []);
      setPickedRocks([])
    }
  }

  return (
    <div className="App">
      <header>
        <h2>Bingo</h2>
      </header>

      {isOwner &&
        <button className='button' disabled={submitDisabled || unpicked.length === 0} onClick={pickRock}>Sortear nova pedra</button>
      }
      <div className='last-picked-container'>
        {lastPicked.length > 0 && <p>Últimas pedras sorteadas: </p>}
        <RockContainer>
          {lastPicked?.map((rock, index) => {
            return <Rock key={rock} rock={rock} active={true} highlight={index === 0}></Rock>
          })}
        </RockContainer>
      </div>
      {isOwner && Boolean(joke) && <small className='joke'>{joke}</small>}
      <div className='divider'></div>
      <RockContainer>
        {allRocks?.map((rock) => {
          return <Rock key={rock} rock={rock} active={pickedRocks?.includes(rock)}></Rock>
        })}
      </RockContainer>
      <Auth />
      {isOwner &&
        <button className='button' onClick={resetGame}>Redefinir o jogo</button>
      }
    </div>
  );
}

export default App;
