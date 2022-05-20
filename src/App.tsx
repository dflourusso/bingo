import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './Auth';
import { database } from './firebase';
import useCurrentUser from './useCurrentUser';
import Image from './astronauta.jpeg'

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const allRocks = Array(75).fill(null).map((_, index) => index + 1)
const allowedWriteEmail = 'dflourusso@gmail.com'

function App() {
  const user = useCurrentUser()
  const [pickedRocks, setPickedRocks] = useState<number[]>([])
  const unpicked = allRocks.filter(p => !pickedRocks?.includes(p)) ?? []
  const lastPicked = pickedRocks?.slice(0, 3) ?? []
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const addPickedRock = (rock: number) => {
    set(ref(database, 'game'), [rock, ...pickedRocks]);
  }

  const pickRock = () => {
    const pickedRock = randomIntFromInterval(0, unpicked.length - 1)
    addPickedRock(unpicked[pickedRock])
    setSubmitDisabled(true)
    setTimeout(() => {
      setSubmitDisabled(false)
    }, 2000)
  }

  useEffect(() => {
    const unsubscribe = onValue(ref(database, 'game'), (snapshot) => {
      if (snapshot) {
        const data = snapshot.val();
        setPickedRocks(data ?? []);
      }
    });
    return () => {
      unsubscribe()
    }
  }, [])

  const resetGame = () => {
    if (window.confirm('Tem certeza que deseja redefinir o jogo?')) {
      set(ref(database, 'game'), []);
      setPickedRocks([])
    }
  }

  return (
    <div className="App">
      <header>
        <img alt="Logo" src={Image}></img>
        <h2>Bingo do Felipe</h2>
      </header>

      {user?.email === allowedWriteEmail &&
        <button className='button' disabled={submitDisabled || unpicked.length === 0} onClick={pickRock}>Sortear nova pedra</button>
      }
      <div className='last-picked-container'>

        {lastPicked.length > 0 && <p>Últimas pedras sorteadas: </p>}
        <div className='rocks-table'>
          {lastPicked?.map((rock, index) => {
            return <div key={rock} className={index === 0 ? 'last-active' : "active"}>
              <span >{rock}</span>
            </div>
          })}
        </div>
      </div>
      <div className='divider'></div>
      <div className='rocks-table'>
        {allRocks?.map((rock) => {
          return <div key={rock} className={pickedRocks?.includes(rock) ? 'active' : ""}>
            <span>{rock}</span>
          </div>
        })}
      </div>
      <Auth />
      {user?.email === allowedWriteEmail &&
        <button className='button' onClick={resetGame}>Redefinir o jogo</button>
      }
    </div>
  );
}

export default App;
