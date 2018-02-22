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

const updateCurrentGame = (payload) => {
    return {
        type: actionConsts.get('UPDATE_CURRENT_GAME'),
        payload
    }
};

const setRefereeMode = (payload) => {
    return {
        type: actionConsts.get('SET_IS_REFEREE'),
        payload
    }
};

export {
    updateCurrentTeam,
    setRefereeMode,
    updateCurrentMatch,
    updateCurrentGame
}