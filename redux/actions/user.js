import actionConsts from '../constants';

const addGInfo = (payload) => {
    return {
        type: actionConsts.get('ADD_GOOGLE_AUTH_INFO'),
        payload
    }
};

const logoutUser = (payload) => {
    return {
        type: actionConsts.get('LOGOUT')
    };
}

export {
    addGInfo,
    logoutUser,
}