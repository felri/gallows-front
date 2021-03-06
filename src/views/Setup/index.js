import React from 'react';
import './style.css';
import Stickman from 'components/stickman';
import { Error, Input, Btn, BtnWhite } from 'components/baseComponents';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api from 'utils/api';
import HomeBtn from 'components/homeBtn';

const Title = () => <div className='title'>Setup</div>;

const SubTitle = ({ children }) => (
  <div className='subtitle-setup'>{children}</div>
);

const WordMaster = ({ handleClick, wordMaster, handleChange }) => {
  return (
    <div className='container-wordmaster'>
      <SubTitle>Pick Wordmaster</SubTitle>
      <div className='container-wordmaster-option'>
        <label>Player 1</label>
        <div
          className='btn-wordmaster-option'
          style={{ backgroundColor: wordMaster === 1 ? 'purple' : 'white' }}
          onClick={() => handleChange(1)}
        />
      </div>
      <div className='container-wordmaster-option'>
        <label>Player 2</label>
        <div
          className='btn-wordmaster-option'
          style={{ backgroundColor: wordMaster === 2 ? 'purple' : 'white' }}
          onClick={() => handleChange(2)}
        />
      </div>
      <Btn handleClick={handleClick}>Start</Btn>
    </div>
  );
};

const LoginForm = ({ handleClick, handleChange, password, name, error }) => (
  <>
    <SubTitle>Pick your enemy</SubTitle>
    <Input value={name} type={'name'} handleChange={handleChange} />
    <Input value={password} type={'password'} handleChange={handleChange} />
    {!!error.length && <Error>{error}</Error>}
    <Btn handleClick={() => handleClick(2)}>Add</Btn>
  </>
);

const Select = ({ handleClick }) => (
  <>
    <SubTitle>Pick your enemy</SubTitle>
    <Btn handleClick={() => handleClick(2)}>Human</Btn>
    <Btn handleClick={() => handleClick()}>Maschine</Btn>
  </>
);

const CreateWord = ({ handleClick }) => {
  const [word, setWord] = React.useState('');

  const handleSend = () => {
    if (word.length > 0) handleClick(word);
  };

  return (
    <>
      <SubTitle>Create word</SubTitle>
      <Input
        value={word}
        type={'Banana...'}
        handleChange={(e) =>
          setWord(e.replace(/\W/g, '').replace(/[0-9]/g, ''))
        }
      />
      <Btn handleClick={handleSend}>Start</Btn>
    </>
  );
};

function Setup(props) {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const user = useSelector((state) => state.userRedcuer.user);
  const wordMaster = useSelector((state) => state.userRedcuer.wordMaster);
  const opponent = useSelector((state) => state.userRedcuer.opponent);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (value, type) => {
    if (type === 'name') setName(value);
    else setPassword(value);
  };

  const handleLogin = async () => {
    if (!name.length || !password.length) setError('Name or password invalid');
    else {
      try {
        setError('');
        const data = await api.getSecondUser({ name, password });
        if (data.error) setError(data.error);
        else {
          dispatch({ type: 'SET_SECOND_USER', payload: data });
          setStep(3);
        }
      } catch (e) {
        console.log(e);
        setError('Something went wrong, please try again');
      }
    }
  };

  const handleOption = (option) => {
    if (option) {
      setStep(option);
      dispatch({ type: 'SET_OPPONENT', payload: 'ai' });
    } else {
      dispatch({ type: 'SET_OPPONENT', payload: 'human' });
      handleWordMaster(2);
      goToGame();
    }
  };

  const handleWordMaster = (option) => {
    dispatch({ type: 'SET_WORDMASTER', payload: option });
  };

  const selectWord = () => {
    setStep(4);
  };

  const goToGame = (word) => {
    if (word) dispatch({ type: 'SET_WORD', payload: word });
    history.push('/game');
  };

  React.useEffect(() => {
    if (!user.id) history.push('/');
  }, []);

  return (
    <div className='container'>
      <Title />
      <div className='container-options-setup'>
        <div className='subcontainer-options-setup'>
          {step === 1 && <Select handleClick={handleOption} />}
          {step === 2 && (
            <LoginForm
              handleClick={handleLogin}
              name={name}
              password={password}
              handleChange={handleChange}
              error={error}
            />
          )}
          {step === 3 && (
            <WordMaster
              handleChange={handleWordMaster}
              handleClick={selectWord}
              wordMaster={wordMaster}
            />
          )}
          {step === 4 && <CreateWord handleClick={goToGame} />}
        </div>
      </div>
      <Stickman />
      <HomeBtn />
    </div>
  );
}

export default Setup;
