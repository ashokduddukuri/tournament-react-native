import {
    combineReducers
} from 'redux';
import userReducer from './user';
import tournamentReducer from './tournament';
import uistate from './uistate';

export default combineReducers({
    "user": userReducer,
    "tournament": tournamentReducer,
    "uistate": uistate
});