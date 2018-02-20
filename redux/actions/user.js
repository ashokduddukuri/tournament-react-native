import actionConsts from '../constants';

export default addGInfo = (payload) => {
    return {
        type: actionConsts.get('ADD_GOOGLE_AUTH_INFO'),
        payload
    }
};