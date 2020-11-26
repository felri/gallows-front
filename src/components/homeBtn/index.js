import { useHistory } from 'react-router-dom';
import './style.css';

export default () => {
  const history = useHistory();

  return (
    <div onClick={() => history.push('/')} className='home-btn'>
      <div>HOME</div>
    </div>
  );
};
