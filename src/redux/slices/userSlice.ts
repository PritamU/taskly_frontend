import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskInterface } from "../commonInterfaces";

interface UserInterface {
  name: string;
  email: string;
  isAuth: boolean;
  snackBar: {
    open: boolean;
    type: AlertColor;
    message: string;
  };
  currentTab: string;
  inProgressTasks: TaskInterface[];
  lateTasks: TaskInterface[];
  completedTasks: TaskInterface[];
  isLoading: boolean;
  countOfCompletedTasks: number;
  countOfIncompleteTasks: number;
  isUserUpdateLoading: boolean;
}

const initialState: UserInterface = {
  isAuth: true,
  email: "",
  name: "",
  snackBar: { open: false, type: "info", message: "" },
  currentTab: "all",
  inProgressTasks: [
    // {
    //   createdAt: "",
    //   description: "A description of the task",
    //   endAt: "",
    //   id: "1",
    //   priority: "high",
    //   startAt: "01/08/2025",
    //   status: "in-progress",
    //   tag: "health",
    //   title: "Task Title 1",
    //   updatedAt: "",
    // },
    // {
    //   createdAt: "",
    //   description: "A description of the task",
    //   endAt: "01/10/2025",
    //   id: "2",
    //   priority: "medium",
    //   startAt: "01/08/2025",
    //   status: "in-progress",
    //   tag: "personal",
    //   title: "Task Title 2",
    //   updatedAt: "",
    // },
    // {
    //   createdAt: "",
    //   description: "A description of the task",
    //   endAt: "01/15/2025",
    //   id: "3",
    //   priority: "low",
    //   startAt: "01/08/2025",
    //   status: "in-progress",
    //   tag: "study",
    //   title: "Task Title 3",
    //   updatedAt: "",
    // },
  ],
  lateTasks: [],
  completedTasks: [],
  isLoading: true,
  countOfCompletedTasks: 0,
  countOfIncompleteTasks: 0,
  isUserUpdateLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; isAuth: boolean }>
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuth = action.payload.isAuth;
    },
    setSnackbar: (
      state,
      action: PayloadAction<{
        open: boolean;
        type: AlertColor;
        message: string;
      }>
    ) => {
      const { message, open, type } = action.payload;
      state.snackBar = { message, open, type };
    },
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsUserUpdateLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserUpdateLoading = action.payload;
    },
    setHomePageData: (
      state,
      action: PayloadAction<{
        inProgressTasks: TaskInterface[];
        lateTasks: TaskInterface[];
        completedTasks: TaskInterface[];
        countOfCompletedTasks: number;
        countOfIncompleteTasks: number;
      }>
    ) => {
      const {
        completedTasks,
        countOfCompletedTasks,
        countOfIncompleteTasks,
        inProgressTasks,
        lateTasks,
      } = action.payload;

      state.completedTasks = completedTasks;
      state.inProgressTasks = inProgressTasks;
      state.lateTasks = lateTasks;
      state.countOfCompletedTasks = countOfCompletedTasks;
      state.countOfIncompleteTasks = countOfIncompleteTasks;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = userSlice.actions;
export const {
  setUser,
  setSnackbar,
  setCurrentTab,
  setHomePageData,
  setIsLoading,
  setIsUserUpdateLoading,
} = userSlice.actions;
export default userSlice.reducer;
