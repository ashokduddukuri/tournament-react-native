import actionConsts from '../constants';
import Immutable from 'immutable';

const tournament = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case actionConsts.get('UPDATE_TOURNAMENT_DATA'):
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default tournament;