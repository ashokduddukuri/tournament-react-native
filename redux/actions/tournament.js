import actionConsts from '../constants';


const updateTournamentData = (payload) => {
    
    return {
        type: actionConsts.get('UPDATE_TOURNAMENT_DATA'),
        payload
    }
};

export {
    updateTournamentData
}