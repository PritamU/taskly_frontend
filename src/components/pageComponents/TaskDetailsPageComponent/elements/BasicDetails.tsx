import {
  PrimaryHeaderDark,
  TextDarkSecondary,
} from "@/components/globalComponents/globalStyledComponents";
import { RootState } from "@/redux/store";
import { getPriorityChipColor, getStatusChipColor } from "@/utils/colors";
import { DateRange, Edit, Tag } from "@mui/icons-material";
import { Chip, IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const BasicDetails = () => {
  const { isTaskDetailsLoading, taskDetails, isTaskUpdatedLoading } =
    useSelector((state: RootState) => state.task);
  const router = useRouter();
  const params = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let priorityChipColor: any = "primary";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let statusChipColor: any = "primary";
  if (taskDetails) {
    priorityChipColor = getPriorityChipColor(taskDetails?.priority);
    statusChipColor = getStatusChipColor(taskDetails?.status);
  }

  return (
    <Stack p={"1rem"}>
      {isTaskDetailsLoading ? (
        <Stack gap={".5rem"}>
          <Skeleton variant="rectangular" />
          <Skeleton variant="rectangular" width={"50%"} />
          <div>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
          <Skeleton variant="rectangular" />
          <Skeleton variant="rectangular" width={"60%"} />
        </Stack>
      ) : (
        <Stack gap={".5rem"}>
          <Stack
            flexDirection={"row"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
          >
            <PrimaryHeaderDark>{taskDetails!.title}</PrimaryHeaderDark>
            <Stack flexDirection={"row"} alignItems={"center"} gap={"1rem"}>
              <Chip
                variant="filled"
                size="small"
                color={statusChipColor}
                sx={{ textTransform: "capitalize" }}
                label={taskDetails?.status.replace("-", " ")}
              />

              <IconButton
                size="small"
                color="secondary"
                sx={{ display: { xs: "none", md: "flex" } }}
                onClick={() => {
                  if (isTaskUpdatedLoading) {
                    return;
                  }
                  router.push(`/tasks/${params["taskId"]}/edit`);
                }}
              >
                <Tooltip title="Edit Task">
                  <Edit />
                </Tooltip>
              </IconButton>
            </Stack>
          </Stack>
          <span>
            <Chip
              variant="filled"
              size="small"
              color={priorityChipColor}
              sx={{ textTransform: "capitalize" }}
              label={taskDetails?.priority}
            />
          </span>
          {taskDetails?.description && (
            <TextDarkSecondary>{taskDetails.description}</TextDarkSecondary>
          )}
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={".5rem"}
          >
            <DateRange sx={{ color: "text.secondary" }} />
            <TextDarkSecondary sx={{ color: "text.primary", fontWeight: 500 }}>
              {dayjs(taskDetails?.startAt).format("ddd,DD MMMM YYYY")} -{" "}
              {dayjs(taskDetails?.endAt).format("ddd,DD MMMM YYYY")}
            </TextDarkSecondary>
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={".5rem"}
          >
            <Tag sx={{ color: "text.secondary" }} />
            <TextDarkSecondary sx={{ color: "text.primary", fontWeight: 500 }}>
              {taskDetails?.tag}
            </TextDarkSecondary>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default BasicDetails;
