import React from 'react';
import StickmanImage from 'components/stickman';
import HomeBtn from 'components/homeBtn';

import './style.css';
import api from 'utils/api';

const Title = ({ children }) => <div className='title'>{children}</div>;

const ScoreboardGrid = ({ ai = false, scoreboard }) => (
  <div className='container-grid' style={{ color: ai ? '#9D27B0' : '#E91E63' }}>
    <div className='container-item-grid'>vs. {ai ? 'Machine' : 'Human'}</div>
    {scoreboard.length > 0 &&
      scoreboard.map((item, index) => (
        <div
          key={index}
          className='container-item-grid'
          style={{
            borderColor: ai ? '#9D27B0' : '#E91E63',
          }}
        >
          <div>
            {index + 1}. {item.name}
          </div>
          <div>{Math.round(item.points)}</div>
        </div>
      ))}
  </div>
);

function Scoreboard(props) {
  const [scoreboardHuman, setScoreboardHuman] = React.useState([]);
  const [scoreboardAi, setScoreboardAi] = React.useState([]);

  const getScoreboard = async () => {
    try {
      const respHuman = await api.getScoreboard({ ai: true });
      setScoreboardHuman(respHuman.data);
      const respAi = await api.getScoreboard({ ai: false });
      setScoreboardAi(respAi.data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getScoreboard();
  }, []);

  return (
    <div className='container'>
      <Title>Scoreboard</Title>
      <StickmanImage />
      <div className='container-grid-scoreboard'>
        <ScoreboardGrid scoreboard={scoreboardHuman} />
        <ScoreboardGrid ai={true} scoreboard={scoreboardAi} />
      </div>
      <HomeBtn />
    </div>
  );
}

export default Scoreboard;
