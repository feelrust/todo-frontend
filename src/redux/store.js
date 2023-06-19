import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
  },
});
