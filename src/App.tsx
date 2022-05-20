import React, { useState } from 'react';
import './App.css';

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const allRocks = Array(75).fill(null).map((_, index) => index + 1)

function App() {
  const [pickedRocks, setPickedRocks] = useState<number[]>([])
  const unpicked = allRocks.filter(p => !pickedRocks.includes(p))
  const lastPicked = pickedRocks.slice(0, 3)
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const addPickedRock = (rock: number) => {
    setPickedRocks(p => [rock, ...p])
  }

  const pickRock = () => {
    const pickedRock = randomIntFromInterval(0, unpicked.length - 1)
    addPickedRock(unpicked[pickedRock])
    setSubmitDisabled(true)
    setTimeout(() => {
      setSubmitDisabled(false)
    }, 2000)
  }

  return (
    <div className="App">
      <button className='pick-button' disabled={submitDisabled || unpicked.length === 0} onClick={pickRock}>Sortear nova pedra</button>
      <div className='last-picked-container'>

        {lastPicked.length > 0 && <p>Últimas pedras sorteadas: </p>}
        <div className='rocks-table'>
          {lastPicked.map((rock, index) => {
            return <div className={index === 0 ? 'last-active' : "active"}>
              <span key={rock}>{rock}</span>
            </div>
          })}
        </div>
      </div>
      <div className='divider'></div>
      <div className='rocks-table'>
        {allRocks.map((rock) => {
          return <div className={pickedRocks.includes(rock) ? 'active' : ""}>
            <span key={rock}>{rock}</span>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
