import {auth, charity, solicitation} from '../../reducers';

import {combineReducers} from 'redux';

const reducers = combineReducers({
  auth,
  charity,
  solicitation,
});

export default reducers;
