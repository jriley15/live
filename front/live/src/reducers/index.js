import { combineReducers } from 'redux';
import login from './loginReducer';
import stream from './streamReducer';

const rootReducer = combineReducers({
  login,
  stream
});




export default rootReducer;