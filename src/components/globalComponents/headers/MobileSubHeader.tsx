import { RootState } from "@/redux/store";
import { ArrowBackIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IconButtonDark, PrimaryHeaderDark } from "../globalStyledComponents";
import {
  CustomMobileSubHeader,
  CustomMobileSubHeaderToolbar,
} from "./customComponents";

const MobileSubHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isTaskDetailsLoading, taskDetails, isTaskUpdatedLoading } =
    useSelector((state: RootState) => state.task);

  const parts = pathname.split("/");
  let routeName = parts[parts.length - 1];
  let showEditTaskIcon =
    !isTaskDetailsLoading &&
    taskDetails?.status !== "completed" &&
    !isTaskUpdatedLoading;
  switch (routeName) {
    case "tasks":
      routeName = "Tasks";
      showEditTaskIcon = false;
      break;
    case "edit":
      routeName = "Edit Task";
      showEditTaskIcon = false;
      break;
    case "about":
      routeName = "About";
      showEditTaskIcon = false;
      break;
    case "create-task":
      routeName = "Create Task";
      showEditTaskIcon = false;
      break;
    default:
      routeName = "Task Details";
  }
  routeName = routeName.replace("-", " ");

  return (
    <CustomMobileSubHeader>
      <CustomMobileSubHeaderToolbar>
        <IconButtonDark
          sx={{ fontSize: "1rem" }}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBackIos fontSize="inherit" />
        </IconButtonDark>
        <PrimaryHeaderDark sx={{ textTransform: "capitalize" }}>
          {routeName}
        </PrimaryHeaderDark>
        {showEditTaskIcon ? (
          <Button
            size="medium"
            variant="text"
            color="primary"
            sx={{
              textTransform: "capitalize",
            }}
            onClick={() => {
              router.push(`${pathname}/edit`);
            }}
          >
            Edit
          </Button>
        ) : (
          <div></div>
        )}
      </CustomMobileSubHeaderToolbar>
    </CustomMobileSubHeader>
  );
};

export default MobileSubHeader;
