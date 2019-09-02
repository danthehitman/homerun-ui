import React, { useState, useEffect } from 'react';
import './App.css';
import {utils, colors} from  './utils';

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1,9))
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft -1);
      }, 1000)      
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    }
    else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }

  return { stars, availableNums, candidateNums, secondsLeft, setGameState};
}

const Game = (props) => {

  const {
    stars, availableNums, candidateNums, secondsLeft, setGameState
  } 
  = useGameState();

  const gameStatus = availableNums.length === 0
    ? 'won'
    : secondsLeft === 0 ? 'lost' : 'active';

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || gameStatus !== 'active') {
      return;
    }
    const newCandidateNums =  
      currentStatus === 'available'
      ? candidateNums.concat(number)
      :candidateNums.filter(cn => cn !== number);

      setGameState(newCandidateNums);
  }

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
           ) : (
            <StarsDisplay stars={stars}/>
           )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <NumberButton 
              key={number} 
              number={number}
              status={numberStatus(number)}              
              onClick={onNumberClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}
  
const StarGrid = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={
        () => { 
          setGameId(gameId + 1);
      }
  }/>
}

const PlayAgain = props => {
  return (
    <div className="game-done">
      <div style={{color: props.gameStatus === 'lost' ? 'red' : 'green' }} className='message'>
        {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  )
}

const NumberButton = props => {
  return (
    <button 
      className="number" 
      style={{ backgroundColor: colors[props.status]}}
      onClick={() => props.onClick(props.number, props.status)}
      >
        {props.number}
    </button>
  )
}

const StarsDisplay = props => {
  return(
    <>
      {utils.range(1, props.stars).map(starId => 
        <div key={starId} className='star'></div>
      )}
    </>
  )
}

export {StarGrid}