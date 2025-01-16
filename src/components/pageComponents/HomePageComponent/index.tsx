import { useFetchHomePageDataQuery } from "@/redux/apis/userApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import {
  setHomePageData,
  setIsLoading,
  setSnackbar,
} from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeComponent from "./HomeComponent";

const HomePageComponent = () => {
  const { currentTab } = useSelector((state: RootState) => state.user);
  const { isError, isSuccess, error, data, isLoading } =
    useFetchHomePageDataQuery({ currentTab });
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (isSuccess) {
        const {
          completedTasks,
          countOfCompletedTasks,
          countOfIncompleteTasks,
          inProgressTasks,
          lateTasks,
        } = data.data;

        dispatch(
          setHomePageData({
            completedTasks,
            countOfCompletedTasks,
            countOfIncompleteTasks,
            inProgressTasks,
            lateTasks,
          })
        );
        dispatch(setIsLoading(false));
      }
      if (isError) {
        let message = "Some Error Occured!";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        dispatch(setSnackbar({ open: true, type: "error", message }));
        dispatch(setIsLoading(false));
      }
      if (isLoading) {
        dispatch(setIsLoading(true));
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsLoading(false));
    }
  }, [isError, isSuccess, error, data, isLoading, dispatch]);

  return <HomeComponent />;
};

export default HomePageComponent;
