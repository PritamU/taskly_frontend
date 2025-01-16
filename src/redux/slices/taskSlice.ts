import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskDetailsInterface, TaskInterface } from "../commonInterfaces";

interface TaskSliceInterface {
  page: number;
  limit: number;
  sortField: string;
  sortValue: "ASC" | "DESC";
  searchKey: string;
  filterTag: string;
  filterPriority: string;
  filterStatus: string;
  taskList: TaskInterface[];
  taskDetails: TaskDetailsInterface | null;
  isTaskListLoading: boolean;
  isTaskDetailsLoading: boolean;
  isTaskUpdatedLoading: boolean;
  totalTasks: number;
}

const initialState: TaskSliceInterface = {
  page: 1,
  limit: 10,
  sortField: "createdAt",
  sortValue: "DESC",
  searchKey: "",
  filterTag: "",
  filterStatus: "",
  filterPriority: "",
  taskList: [],
  taskDetails: null,
  isTaskListLoading: true,
  isTaskDetailsLoading: false,
  isTaskUpdatedLoading: false,
  totalTasks: 0,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setIsTaskListLoading: (state, action: PayloadAction<boolean>) => {
      state.isTaskListLoading = action.payload;
    },
    setIsTaskDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isTaskDetailsLoading = action.payload;
    },
    setIsTaskUpdatedLoading: (state, action: PayloadAction<boolean>) => {
      state.isTaskUpdatedLoading = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{ sortField: string; sortValue: "ASC" | "DESC" }>
    ) => {
      state.sortField = action.payload.sortField;
      state.sortValue = action.payload.sortValue;
    },
    setTaskList: (
      state,
      action: PayloadAction<{ taskList: TaskInterface[]; totalTasks: number }>
    ) => {
      state.taskList = action.payload.taskList;
      state.totalTasks = action.payload.totalTasks;
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    setTaskDetails: (state, action: PayloadAction<TaskDetailsInterface>) => {
      state.taskDetails = action.payload;
    },
    setSubTasks: (
      state,
      action: PayloadAction<{ title: string; status: boolean }[]>
    ) => {
      state.taskDetails = { ...state.taskDetails!, subTasks: action.payload };
    },
  },
});

// export const { increment, decrement, incrementByAmount } = userSlice.actions;
export const {
  setPage,
  setLimit,
  setSort,
  setIsTaskListLoading,
  setTaskList,
  setSearchKey,
  setTaskDetails,
  setIsTaskDetailsLoading,
  setIsTaskUpdatedLoading,
  setSubTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
