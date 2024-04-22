// actions.js
export const UPDATE_REGISTRATION_DATA = 'UPDATE_REGISTRATION_DATA';

export const updateRegistrationData = (data) => ({
  type: UPDATE_REGISTRATION_DATA,
  payload: data,
});

export const updatePrivateData = (data) => ({
  type: 'UPDATE_PRIVATE_DATA',
  payload: data,
});

export const updateMemberData = (data) => ({
  type: 'UPDATE_MEMBER_DATA',
  payload: data,
});

export const updatePreferData = (data) => ({
  type: 'UPDATE_PREFER_DATA',
  payload: data,
});

export const updateHealthData = (data) => ({
  type: 'UPDATE_HEALTH_DATA',
  payload: data,
});
