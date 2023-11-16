import { createAction, createReducer } from "@reduxjs/toolkit";

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");

const initialState = {
  fullname: null,
  email: null,
  dni: null,
  phoneNumber: null,
};

const userReducer = createReducer(initialState, {
  [login]: (state, action) => action.payload,
  [logout]: (state, action) => {
    state.fullname = null;
    state.email = null;
    state.dni = null;
    state.phoneNumber = null;
  },
});

export default userReducer;
