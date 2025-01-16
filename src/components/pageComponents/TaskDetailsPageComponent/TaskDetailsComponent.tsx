import { PrimaryButton } from "@/components/globalComponents/globalStyledComponents";
import { RootState } from "@/redux/store";
import { Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import BasicDetails from "./elements/BasicDetails";
import ConfirmationModal from "./elements/ConfirmationModal";
import SubTasks from "./elements/SubTasks";

const TaskDetailsComponent = () => {
  const { isTaskDetailsLoading, isTaskUpdatedLoading, taskDetails } =
    useSelector((state: RootState) => state.task);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"delete" | "update">("update");

  return (
    <Stack>
      <BasicDetails />
      <SubTasks />
      {!isTaskDetailsLoading && (
        <Stack
          component={Paper}
          gap={".5rem"}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            // display: { xs: "flex", md: "none" },
            p: "1rem",
          }}
        >
          <PrimaryButton
            size="small"
            onClick={() => {
              setModalType("update");
              setOpenModal(true);
            }}
            disabled={
              isTaskUpdatedLoading || taskDetails?.status === "completed"
            }
          >
            {taskDetails?.status === "completed"
              ? "Completed"
              : "Mark As Completed"}
          </PrimaryButton>
          <Button
            disabled={isTaskUpdatedLoading}
            variant="outlined"
            size="small"
            color="error"
            sx={{ borderRadius: "2rem" }}
            onClick={() => {
              setModalType("delete");
              setOpenModal(true);
            }}
          >
            Delete Task
          </Button>
        </Stack>
      )}
      {openModal && (
        <ConfirmationModal
          type={modalType}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </Stack>
  );
};

export default TaskDetailsComponent;
