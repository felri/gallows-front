import React from 'react';
import './style.css';

import RopePng from 'assets/imgs/Rope.png';
import StickmanPng from 'assets/imgs/Stickman.png';

function Stickman(props) {
  return (
    <div className='container-stikman'>
      <div className='inside-container-stikman'>
        <img src={RopePng} className='container-rope-img' />
        <img src={StickmanPng} className='container-body-img' />
      </div>
    </div>
  );
}

export default Stickman;
