import {TEST_ACTION} from '../actions/index.actions';

const test = (state = {}, action) => {
  switch (action.type) {
  case TEST_ACTION: {
    console.log('In reducer');
    return action.payload;
  }
  default:
    return state;
  }
};

export default test;
