import {ADD_GOOGLE_AUTH_INFO} from '../constants/index.actions';

const user = (state = {}, action) => {
    const payload = action.payload;
    switch (action.type) {
        case ADD_GOOGLE_AUTH_INFO:
            {
                return {
                    ...state,
                    payload
                };
            }
        default:
            return state;
    }
};

export default user;
