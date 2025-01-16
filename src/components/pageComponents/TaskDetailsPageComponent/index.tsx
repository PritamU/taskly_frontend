"use client";

import { useFetchTasksDetailsQuery } from "@/redux/apis/taskApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import {
  setIsTaskDetailsLoading,
  setTaskDetails,
} from "@/redux/slices/taskSlice";
import { setSnackbar } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskDetailsComponent from "./TaskDetailsComponent";

const TaskDetailsPageComponent = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const taskId = param["taskId"] as string;

  const { isError, isLoading, isSuccess, data, error } =
    useFetchTasksDetailsQuery({ taskId: taskId! });

  useEffect(() => {
    try {
      if (isSuccess) {
        dispatch(setTaskDetails(data.data));
        dispatch(setIsTaskDetailsLoading(false));
      }
      if (isError) {
        let message = "Some Error Occured!";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        throw new Error(message);
      }
      if (isLoading) {
        dispatch(setIsTaskDetailsLoading(true));
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsTaskDetailsLoading(false));
    }
  }, [isError, isSuccess, error, data, isLoading, dispatch]);

  return <TaskDetailsComponent />;
};

export default TaskDetailsPageComponent;
