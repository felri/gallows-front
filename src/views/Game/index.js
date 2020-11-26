import React from 'react';
import ArmLeft from 'assets/imgs/Arm_left.png';
import ArmRight from 'assets/imgs/Arm_right.png';
import Body from 'assets/imgs/Body.png';
import Face from 'assets/imgs/Face.png';
import LegLeft from 'assets/imgs/Leg_left.png';
import LegRight from 'assets/imgs/Leg_right.png';
import Union from 'assets/imgs/Union.png';
import Rope from 'assets/imgs/Rope.png';
import api from 'utils/api';
import useEventListener from '@use-it/event-listener';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Btn, BtnWhite } from 'components/baseComponents';
import StickmanImage from 'components/stickman';
import HomeBtn from 'components/homeBtn';

import './style.css';

const Stickman = ({ errorNumber }) => (
  <div style={{ position: 'relative', width: '50%' }}>
    <div style={{ position: 'absolute' }}>
      <div style={{ position: 'relative' }}>
        {errorNumber < 1 && (
          <img alt='img' src={ArmLeft} className='container-armleft-img' />
        )}
        {errorNumber < 2 && (
          <img alt='img' src={ArmRight} className='container-armright-img' />
        )}
        {errorNumber < 5 && (
          <img alt='img' src={Body} className='container-body-img' />
        )}
        {errorNumber < 4 && (
          <img alt='img' src={LegLeft} className='container-legleft-img' />
        )}
        {errorNumber < 3 && (
          <img alt='img' src={LegRight} className='container-legright-img' />
        )}
        <img alt='img' src={Rope} className='container-rope-union-img' />
        {errorNumber < 6 && (
          <img alt='img' src={Face} className='container-face-img' />
        )}
        <img alt='img' src={Union} className='container-union-img' />
      </div>
    </div>
  </div>
);

const Letter = ({ letter, showLetter }) => (
  <div className='letter  '>
    <div className='container-letter'>{showLetter && letter}</div>
    <div className='underline' />
  </div>
);

const Word = ({ word, playerWord, giveUp }) => (
  <div className='container-word'>
    <div className='word'>
      {word.length > 0 &&
        word
          .split('')
          .map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              showLetter={playerWord.includes(letter)}
            />
          ))}
    </div>
    <div style={{ position: 'absolute', bottom: 0 }}>
      <BtnWhite handleClick={giveUp}>Give up</BtnWhite>
    </div>
  </div>
);
const Title = ({ children }) => <div className='title'>{children}</div>;

const SubTitle = ({ children }) => (
  <div className='subtitle-login'>{children}</div>
);

const GameOver = ({ points, handleClick }) => (
  <div className='container-gameover'>
    <Title>GAME OVER</Title>
    <SubTitle>Your Score</SubTitle>
    <div className='gameover'>
      <div className='points'>{points} points</div>
      <Btn handleClick={handleClick}>Scoreboard</Btn>
    </div>
    <StickmanImage />
  </div>
);

const Win = ({ points, handleClick }) => (
  <div className='container-gameover'>
    <Title>VICTORY</Title>
    <SubTitle>Your Score</SubTitle>
    <div className='gameover'>
      <div className='points'>{points} points</div>
      <Btn handleClick={handleClick}>Scoreboard</Btn>
    </div>
    <StickmanImage />
  </div>
);

function Game(props) {
  const [errorNumber, setErrorNumber] = React.useState(0);
  const [playerWord, setplayerWord] = React.useState('');
  const [gameOver, setGameOver] = React.useState(false);
  const [win, setWin] = React.useState(false);
  const [points, setPoints] = React.useState(0);

  const history = useHistory();
  const word = useSelector((state) => state.userRedcuer.word);
  const opponent = useSelector((state) => state.userRedcuer.opponent);

  const player_id = useSelector((state) =>
    state.userRedcuer.wordMaster !== 1
      ? state.userRedcuer.user.id
      : state.userRedcuer.secondPlayer.id
  );
  const ai = useSelector((state) => state.userRedcuer.opponent === 'ai');
  const dispatch = useDispatch();

  const getWord = async () => {
    if (!word.length || opponent !== 'ai')
      try {
        const data = await api.getWord();
        dispatch({ type: 'SET_WORD', payload: data.word });
      } catch (e) {
        console.log(e);
      }
  };

  const handlerKeyDown = ({ key }) => {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(key.toLowerCase())) {
      if (playerWord.includes(key.toLowerCase())) setErrorNumber((f) => f + 1);
      else {
        if (word.includes(key.toLowerCase())) {
          setplayerWord(playerWord + key.toLowerCase());
          setPoints(points + 10);
        } else setErrorNumber(errorNumber + 1);
      }
    }
  };

  const goToScore = async () => {
    await api.setScore({ player_id: player_id, points, ai });
    history.push('/scoreboard');
  };

  React.useEffect(() => {
    if (!player_id) history.push('/');
    getWord();
  }, []);

  React.useEffect(() => {
    let s1 = playerWord.split('');
    let s2 = [...new Set(word)];

    let i = s1.length + 1;
    while (i--) {
      if (s2.indexOf(s1[i]) >= 0) s2.splice(s2.indexOf(s1[i]), 1);
    }

    if (s2.length === 0 && word.length !== 0) setWin(true);
  }, [playerWord]);

  React.useEffect(() => {
    if (errorNumber > 5) setGameOver(true);
  }, [errorNumber]);

  useEventListener('keydown', handlerKeyDown);

  return (
    <div className='container container-main-game'>
      {gameOver ? (
        <GameOver points={points} handleClick={goToScore} />
      ) : win ? (
        <Win points={points} handleClick={goToScore} />
      ) : (
        <>
          <Stickman errorNumber={errorNumber} />
          <div>
            <Word
              word={word}
              playerWord={playerWord}
              giveUp={() => setGameOver(true)}
            />
          </div>
        </>
      )}
      <HomeBtn />
    </div>
  );
}

export default Game;
