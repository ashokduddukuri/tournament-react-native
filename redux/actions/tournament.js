import actionConsts from '../constants';


export default updateTournamentData = (payload) => {
    
    return {
        type: actionConsts.get('UPDATE_TOURNAMENT_DATA'),
        payload
    }
};