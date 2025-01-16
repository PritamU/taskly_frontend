import { PrimaryHeaderDark } from "@/components/globalComponents/globalStyledComponents";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "@/redux/apis/taskApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setIsTaskUpdatedLoading } from "@/redux/slices/taskSlice";
import { setSnackbar } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import {
  Button,
  CircularProgress,
  Grid2,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConfirmationModal = ({
  type,
  openModal,
  setOpenModal,
}: {
  type: "update" | "delete";
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskDetails, isTaskUpdatedLoading } = useSelector(
    (state: RootState) => state.task
  );
  const [updateTaskStatus, { isError, isLoading, isSuccess, error, data }] =
    useUpdateTaskStatusMutation();
  const [
    deleteTask,
    {
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteErrorData,
      data: deleteResponseData,
    },
  ] = useDeleteTaskMutation();

  // function to initiate task status update
  const updateStatusHandler = async () => {
    try {
      await updateTaskStatus({ todoId: taskDetails!.id, status: "completed" });
    } catch (e) {
      let message = "Some Error Occured";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
    }
  };

  // function to initiate task delete
  const deleteTaskHandler = async () => {
    try {
      await deleteTask({ todoId: taskDetails!.id });
    } catch (e) {
      let message = "Some Error Occured";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
    }
  };

  // handle task status update api loading, success and error
  useEffect(() => {
    try {
      if (isLoading) {
        dispatch(setIsTaskUpdatedLoading(true));
      }
      if (isError) {
        let message = "Some Error Occured";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        throw new Error(message);
      }
      if (isSuccess) {
        dispatch(
          setSnackbar({
            open: true,
            type: "success",
            message: "Task Completed!",
          })
        );
        dispatch(setIsTaskUpdatedLoading(false));
        setOpenModal(false);
      }
    } catch (e) {
      let message = "Some Error Occured";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsTaskUpdatedLoading(false));
    }
  }, [isSuccess, isError, isLoading, error, data, dispatch, setOpenModal]);

  // handle task delete api loading, success and error
  useEffect(() => {
    try {
      if (isDeleteLoading) {
        dispatch(setIsTaskUpdatedLoading(true));
      }
      if (isDeleteError) {
        let message = "Some Error Occured";
        if ("data" in deleteErrorData) {
          const errorData = deleteErrorData.data as ApiErrorInterface;
          message = errorData.message;
        }
        throw new Error(message);
      }
      if (isDeleteSuccess) {
        dispatch(
          setSnackbar({
            open: true,
            type: "success",
            message: "Task Deleted!",
          })
        );
        dispatch(setIsTaskUpdatedLoading(false));
        router.push("/tasks");
      }
    } catch (e) {
      let message = "Some Error Occured";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsTaskUpdatedLoading(false));
    }
  }, [
    isDeleteSuccess,
    isDeleteError,
    isDeleteLoading,
    deleteErrorData,
    deleteResponseData,
    dispatch,
    router,
  ]);

  return (
    <Modal
      open={openModal}
      onClose={() => {
        if (!isTaskUpdatedLoading) {
          setOpenModal(false);
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        component={Paper}
        sx={{
          alignItems: "center",
          width: "80%",
          maxWidth: "400px",
          borderRadius: "1rem",
        }}
      >
        <PrimaryHeaderDark padding={"1rem"}>
          {type === "delete"
            ? "Are you sure you want to delete this task?"
            : "Are you sure you want to complete this task?"}
        </PrimaryHeaderDark>
        <Grid2 container sx={{ width: "100%" }}>
          <Grid2
            size={6}
            sx={{
              borderTop: "1px solid",
              borderRight: "1px solid",
              borderColor: "text.secondary",
            }}
          >
            <Button
              disabled={isTaskUpdatedLoading}
              fullWidth
              variant="text"
              color="warning"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Grid2>
          <Grid2
            size={6}
            sx={{ borderTop: "1px solid", borderColor: "text.secondary" }}
          >
            <Button
              disabled={isTaskUpdatedLoading}
              fullWidth
              variant="text"
              color={type === "delete" ? "error" : "info"}
              sx={{
                display: "flex",
                gap: ".5rem",
              }}
              onClick={() => {
                if (type === "delete") {
                  deleteTaskHandler();
                  return;
                }
                updateStatusHandler();
              }}
            >
              {type === "delete" ? "Delete" : "Confirm"}
              {isTaskUpdatedLoading && <CircularProgress size={"1rem"} />}
            </Button>
          </Grid2>
        </Grid2>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
