import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification/notificationSlice";
import blogSlice from "./blogs/blogSlice";

export const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blog: blogSlice
    },
});
