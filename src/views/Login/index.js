import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Stickman from 'components/stickman';
import { Error, Input, Btn, BtnWhite } from 'components/baseComponents';
import api from 'utils/api';

const Title = () => <div className='title'>The</div>;

const SubTitle = () => <div className='subtitle-login'>Hangman</div>;

const LoginOrRegister = ({ handleClick }) => (
  <>
    <Btn handleClick={() => handleClick(2)}>Create Account</Btn>
    <BtnWhite handleClick={() => handleClick(3)}>Login</BtnWhite>
  </>
);

const LoginForm = ({ handleClick, handleChange, password, name, error }) => (
  <>
    <Input value={name} type={'name'} handleChange={handleChange} />
    <Input value={password} type={'password'} handleChange={handleChange} />
    {!!error.length && <Error>{error}</Error>}
    <Btn handleClick={() => handleClick(2)}>Login</Btn>
  </>
);

const RegisterForm = ({ handleClick, handleChange, password, name, error }) => (
  <>
    <Input value={name} type={'name'} handleChange={handleChange} />
    <Input value={password} type={'password'} handleChange={handleChange} />
    {!!error.length && <Error>{error}</Error>}
    <Btn handleClick={() => handleClick(2)}>Create Account</Btn>
  </>
);

function Login(props) {
  const [step, setStep] = React.useState(1);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (option) => {
    setName('');
    setPassword('');
    setStep(option);
  };

  const handleChange = (value, type) => {
    if (type === 'name') setName(value);
    else setPassword(value);
  };

  const handleRegister = async () => {
    if (!name.length || !password.length) setError('Name or password invalid');
    else {
      try {
        setError('');
        const data = await api.createUser({ name, password });
        if (data.error) setError(data.error);
        else {
          dispatch({ type: 'SET_USER', payload: data });
          history.push('/setup');
        }
      } catch (e) {
        console.log(e);
        setError('Something went wrong, please try again');
      }
    }
  };

  const handleLogin = async () => {
    if (!name.length || !password.length) setError('Name or password invalid');
    else {
      try {
        setError('');
        const data = await api.getUser({ name, password });
        if (data.error) setError(data.error);
        else {
          dispatch({ type: 'SET_USER', payload: data });
          history.push('/setup');
        }
      } catch (e) {
        console.log(e);
        setError('Something went wrong, please try again');
      }
    }
  };

  return (
    <div className='container'>
      <Title />
      <SubTitle />
      <div className='container-options-login'>
        <div className='subcontainer-options-login'>
          {step === 1 && <LoginOrRegister handleClick={handleClick} />}
          {step === 2 && (
            <RegisterForm
              name={name}
              password={password}
              handleClick={handleRegister}
              handleChange={handleChange}
              error={error}
            />
          )}
          {step === 3 && (
            <LoginForm
              handleClick={handleLogin}
              name={name}
              password={password}
              handleChange={handleChange}
              error={error}
            />
          )}
        </div>
      </div>
      <Stickman />
    </div>
  );
}

export default Login;
