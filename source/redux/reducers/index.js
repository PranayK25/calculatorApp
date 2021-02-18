import {combineReducers} from 'redux';
import App from './app.reducer';

const appReducer = combineReducers({
  App,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
