import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        msg: "",
        color: ""
    },
    reducers: {
        showNotification(state, action) {
            return {
                msg: action.payload.msg,
                color: action.payload.color
            };
        },
        removeNotification(state, action) {
            return {
                msg: "",
                color: ""
            };
        }
    }
})

export const { showNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;