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
        default:
            return state;
    }
}

export default uistate;