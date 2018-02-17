import {
    combineReducers
} from 'redux';
import userReducer from './user';
import tournamentReducer from './tournament';

export default combineReducers({
    "user": userReducer,
    "tournament": tournamentReducer
});