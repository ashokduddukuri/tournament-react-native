import actionConsts from '../constants';
import Immutable from 'immutable';

const uistate = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case actionConsts.get('UPDATE_CURRENT_TEAM'):
            return {
                ...state,
                'currentTeamId': payload
            };
        case actionConsts.get('UPDATE_CURRENT_MATCH'):
            return {
                ...state,
                'currentMatchId': payload
            };
        case actionConsts.get('SET_IS_REFEREE'):
            return {
                ...state,
                'isReferee': true
            };
        default:
            return state;
    }
}

export default uistate;