import Immutable from 'immutable';

const actions = Immutable.Map({
    TEST_ACTION             : 'TEST_ACTION',
    ADD_GOOGLE_AUTH_INFO    : 'ADD_GOOGLE_AUTH_INFO',
    UPDATE_TOURNAMENT_DATA  : 'UPDATE_TOURNAMENT_DATA',
    UPDATE_CURRENT_TEAM     : 'UPDATE_CURRENT_TEAM',
    SET_IS_REFEREE          : 'SET_IS_REFEREE,',
    UPDATE_CURRENT_MATCH    : 'UPDATE_CURRENT_MATCH',
    UPDATE_CURRENT_GAME     : 'UPDATE_CURRENT_GAME',
});

export default actions;