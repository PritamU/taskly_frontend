import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { taskApi } from "./apis/taskApi";
import { userApi } from "./apis/userApi";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";

// Create the store
export const store = configureStore({
  reducer: {
    user: userReducer, // Add your slices here
    task: taskReducer, // Add your slices here
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(taskApi.middleware),
});

// Types for TypeScript
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
