import { createAction, createReducer } from "@reduxjs/toolkit";

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");

const initialState = {
  name: null,
  lastname: null,
  email: null,
};

const userReducer = createReducer(initialState, {
  [login]: (state, action) => action.payload,
  [logout]: (state, action) => {
    state.name = null;
    state.lastname = null;
    state.email = null;
  },
});

export default userReducer;
