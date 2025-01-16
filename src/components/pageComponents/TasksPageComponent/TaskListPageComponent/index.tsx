"use client";
import { PriorityTypes } from "@/data/commonTypes";
import { useFetchTasksQuery } from "@/redux/apis/taskApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setIsTaskListLoading, setTaskList } from "@/redux/slices/taskSlice";
import { setSnackbar } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskListComponent from "./TaskListComponent";
const TaskListPageComponent = () => {
  const { page, limit, sortField, sortValue, searchKey } = useSelector(
    (state: RootState) => state.task
  );
  const dispatch = useDispatch();
  const params = useSearchParams();

  let statusParam = params.get("status");
  const tagParam = params.get("tag");
  const priorityParam = params.get("priority") as PriorityTypes;

  if (statusParam === "in-progress") {
    statusParam = "pending,in-progress";
  }

  const { isError, isLoading, isSuccess, data, error } = useFetchTasksQuery({
    page,
    limit,
    sortField,
    sortValue,
    status: statusParam ? statusParam : "",
    tag: tagParam ? tagParam : "",
    priority: priorityParam ? priorityParam : "",
    searchKey,
  });

  useEffect(() => {
    try {
      if (isSuccess) {
        dispatch(
          setTaskList({ taskList: data.data.data, totalTasks: data.data.count })
        );
        dispatch(setIsTaskListLoading(false));
      }
      if (isError) {
        let message = "Some Error Occured!";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        dispatch(setSnackbar({ open: true, type: "error", message }));
        dispatch(setTaskList({ taskList: [], totalTasks: 0 }));
        dispatch(setIsTaskListLoading(false));
      }
      if (isLoading) {
        dispatch(setIsTaskListLoading(true));
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsTaskListLoading(false));
    }
  }, [isSuccess, isError, isLoading, error, data, dispatch]);

  return <TaskListComponent />;
};

export default TaskListPageComponent;
