export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const SEARCH_USER = "SEARCH_USER";
export const EDIT_USER = "EDIT-USER";

export const addUsers = (user) => {
  debugger;
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const userToBeUpdated = (user) => {
  //on edit button the datat dispatched to this
  return {
    type: EDIT_USER,
    payload: user,
  };
};

export const updateUser = (user) => {
  //when we are on the form and again edit the user data and submit it then this will work
  return {
    type: UPDATE_USER,
    payload: user,
  };
};
export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};
