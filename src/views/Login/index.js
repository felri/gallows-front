import React from 'react';
import './style.css';
import Stickman from 'components/stickman';

const Title = () => <div className='title'>The</div>;

const SubTitle = () => <div className='subtitle-login'>Hangman</div>;

const Error = ({ children }) => <div classNmae='error-form'>{children}</div>;

const Input = ({ value, type, handleChange }) => (
  <input
    className='input-form'
    value={value}
    onChange={(e) => handleChange(e.target.value, type)}
    placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
    type={type}
  />
);

const Btn = ({ children, handleClick }) => (
  <div onClick={handleClick} className='btn'>
    {children}
  </div>
);

const BtnWhite = ({ children, handleClick }) => (
  <div onClick={handleClick} className='btn-white'>
    {children}
  </div>
);

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

  const handleClick = (option) => {
    setName('');
    setPassword('');
    setStep(option);
  };

  const handleChange = (value, type) => {
    if (type === 'name') setName(value);
    else setPassword(value);
  };

  const handleRegister = () => {};

  const handleLogin = () => {};

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
              handleClick={handleClick}
              handleChange={handleChange}
              error={error}
            />
          )}
          {step === 3 && (
            <LoginForm
              handleClick={handleClick}
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
