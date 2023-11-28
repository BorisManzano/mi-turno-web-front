import { createAction, createReducer } from "@reduxjs/toolkit";

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
const initialState = {
  fullname: null,
  email: null,
  dni: null,
  telephone: null,
  isAdmin: false,
  isOperator: false,
};

const userReducer = createReducer(initialState, {
  [login]: (state, action) => action.payload,
  [logout]: (state, action) => {
    return {
      ...initialState,
    };
  },
});

export default userReducer;
