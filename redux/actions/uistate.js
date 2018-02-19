import actionConsts from '../constants';

const updateCurrentTeam = (payload) => {
    return {
        type: actionConsts.get('UPDATE_CURRENT_TEAM'),
        payload
    }
};

const updateCurrentMatch = (payload) => {
    return {
        type: actionConsts.get('UPDATE_CURRENT_MATCH'),
        payload
    }
};

const enableRefereeMode = () => {
    return {
        type: actionConsts.get('SET_IS_REFEREE')
    }
};

export {
    updateCurrentTeam,
    enableRefereeMode,
    updateCurrentMatch
}