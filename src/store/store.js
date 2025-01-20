import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification/notificationSlice";

export const store = configureStore({
    reducer: {
        notification: notificationSlice,
    },
});
