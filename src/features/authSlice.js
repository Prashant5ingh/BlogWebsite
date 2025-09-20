// store for tracking all authentication. If user is authenticated or not will be given by this slice store.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false, // false means user isn't authenticated
    userData: null, // user data will be stored here after login or sign up 
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout:(state,action) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;