// reducers.js
// import { UPDATE_REGISTRATION_DATA } from './actions';

const initialState = {
  registrationData: {},
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_PRIVATE_DATA':
        return {
          ...state,
          Private: action.payload,
        };
      case 'UPDATE_MEMBER_DATA':
        return {
          ...state,
          Member: action.payload,
        };
      case 'UPDATE_PREFER_DATA':
        return {
          ...state,
          Prefer: action.payload,
        };
      case 'UPDATE_HEALTH_DATA':
        return {
          ...state,
          Health: action.payload,
        };
      default:
        return state;
    }
  };
  

export default registrationReducer;
