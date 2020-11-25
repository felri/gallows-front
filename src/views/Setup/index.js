import React from 'react';
import './style.css';
import Stickman from 'components/stickman';

const Title = () => <div className='title'>Setup</div>;

const SubTitle = () => <div className='subtitle-setup'>Pick your enemy</div>;

const Btn = ({ children }) => <div className='btn'>{children}</div>;

function Setup(props) {
  return (
    <div className='container'>
      <Title />
      <div className='container-options-setup'>
        <SubTitle />
        <div className='subcontainer-options-setup'>
          <Btn>Human</Btn>
          <Btn>Maschine</Btn>
        </div>
      </div>
      <Stickman />
    </div>
  );
}

export default Setup;
