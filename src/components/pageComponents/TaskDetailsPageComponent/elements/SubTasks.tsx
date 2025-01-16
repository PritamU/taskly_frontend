import EmptyTaskComponent from "@/components/globalComponents/common/EmptyTaskComponent";
import {
  PrimaryHeaderDark,
  TextDark,
} from "@/components/globalComponents/globalStyledComponents";
import { useUpdateTaskMutation } from "@/redux/apis/taskApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setIsTaskUpdatedLoading } from "@/redux/slices/taskSlice";
import { setSnackbar } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { IconButton, Paper, Skeleton, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubTasks = () => {
  const { taskDetails, isTaskDetailsLoading, isTaskUpdatedLoading } =
    useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();

  const [updateTask, { isLoading, isError, isSuccess, data, error }] =
    useUpdateTaskMutation();

  // sub task onclick handler
  const subTaskChangeHandler = async ({ index }: { index: number }) => {
    try {
      if (isTaskUpdatedLoading) {
        return;
      }
      const newSubTasks = taskDetails!.subTasks.map((item, itemIndex) => {
        const newItem = { ...item };
        if (index === itemIndex) {
          newItem.status = !newItem.status;
        }
        return { ...newItem };
      });

      await updateTask({ todoId: taskDetails!.id, subTasks: newSubTasks });
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
    }
  };

  // useEffect to handle sub task onchange mutation
  useEffect(() => {
    try {
      if (isLoading) {
        dispatch(setIsTaskUpdatedLoading(true));
      }
      if (isSuccess) {
        dispatch(setIsTaskUpdatedLoading(false));
      }
      if (isError) {
        let message = "Some Error Occured";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        throw new Error(message);
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsTaskUpdatedLoading(false));
    }
  }, [isLoading, isError, isSuccess, error, data, dispatch]);

  return (
    <Stack gap={".5rem"} p={"1rem"} mb={"6rem"}>
      <PrimaryHeaderDark>Sub Tasks</PrimaryHeaderDark>
      {isTaskDetailsLoading ? (
        <Stack gap={".5rem"} p={"1rem"}>
          <Skeleton
            variant="rounded"
            height={"50px"}
            sx={{ borderRadius: "1rem" }}
          />
          <Skeleton
            variant="rounded"
            height={"50px"}
            sx={{ borderRadius: "1rem" }}
          />
          <Skeleton
            variant="rounded"
            height={"50px"}
            sx={{ borderRadius: "1rem" }}
          />
          <Skeleton
            variant="rounded"
            height={"50px"}
            sx={{ borderRadius: "1rem" }}
          />
          <Skeleton
            variant="rounded"
            height={"50px"}
            sx={{ borderRadius: "1rem" }}
          />
        </Stack>
      ) : (
        <>
          {taskDetails && taskDetails.subTasks.length > 0 ? (
            <Stack gap={".5rem"}>
              {taskDetails.subTasks.map((item, index) => {
                const { status, title } = item;
                return (
                  <Stack
                    component={Paper}
                    key={index}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={".5rem 1rem"}
                    borderRadius={"1rem"}
                    onClick={() => {
                      if (
                        isTaskUpdatedLoading ||
                        taskDetails.status === "completed"
                      ) {
                        return;
                      }
                      subTaskChangeHandler({ index });
                    }}
                  >
                    <TextDark>{title}</TextDark>
                    <IconButton color="primary">
                      {/* {isTaskUpdatedLoading ? (
                        <>
                          <CircularProgress size={"1.5rem"} />
                        </>
                      ) : (
                        <> */}
                      {status ? <CheckCircle /> : <RadioButtonUnchecked />}
                      {/* </> */}
                      {/* )} */}
                    </IconButton>
                  </Stack>
                );
              })}
            </Stack>
          ) : (
            <EmptyTaskComponent title="No Sub Tasks Added" type="subtask" />
          )}
        </>
      )}
    </Stack>
  );
};

export default SubTasks;
