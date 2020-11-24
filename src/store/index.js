import { combineReducers } from 'redux';
import userRedcuer from './user/reducer';

const rootReducer = combineReducers({
  userRedcuer,
});

export default rootReducer;
