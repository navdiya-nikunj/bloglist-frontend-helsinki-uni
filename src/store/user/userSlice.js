import { createSlice } from "@reduxjs/toolkit";
import loginService from "../../services/login";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setuser(state, action) {
            return action.payload;
        },
        removeUser(state, action) {
            return null;
        }
    }
})

export default userSlice.reducer;
export const { setuser, removeUser } = userSlice.actions;


export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login(username, password);
        console.log(user);
        dispatch(setuser(user));
    }
}

export const logout = () => {
    return async dispatch => {
        await loginService.logOut();
        dispatch(removeUser());
    }
}