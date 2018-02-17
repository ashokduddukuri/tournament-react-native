import actionConsts from '../constants';

const updateCurrentTeam = (payload) => {
    return {
        type: actionConsts.get('UPDATE_CURRENT_TEAM'),
        payload
    }
};

export {
    updateCurrentTeam
}