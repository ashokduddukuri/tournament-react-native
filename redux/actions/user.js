import {ADD_GOOGLE_AUTH_INFO} from '../constants/index.actions';

export default addGInfo = (payload) => {
    return {type: ADD_GOOGLE_AUTH_INFO, payload}
};