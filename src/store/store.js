import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification/notificationSlice";
import blogSlice from "./blogs/blogSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blog: blogSlice,
        user: userSlice
    },
});
