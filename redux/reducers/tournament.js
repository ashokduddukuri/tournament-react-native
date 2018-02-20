import actionConsts from '../constants';
import Immutable from 'immutable';

const tournament = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case actionConsts.get('UPDATE_TOURNAMENT_DATA'):
            return {
                ...state,
                ...payload
            };
        case actionConsts.get('UPDATE_CURRENT_TEAM'):
            return {
                ...state,
                'currentTeamId': payload
            };
        default:
            return state;
    }
}

export default tournament;