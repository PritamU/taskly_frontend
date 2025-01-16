import { TaskInterface } from "@/redux/commonInterfaces";
import { getPriorityChipColor } from "@/utils/colors";
import { Chip, Grid2, Paper, Skeleton, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import {
  PrimaryHeaderDark,
  TextDarkSecondary,
} from "../globalStyledComponents";

const TasksComponent = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: TaskInterface[];
}) => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        alignItems: "stretch",
        flexDirection: { xs: "column", md: "row" },
      }}
      wrap="wrap"
    >
      {isLoading ? (
        <>
          {Array(3)
            .fill(0)
            .map((item, index) => {
              return <LoadingTaskComponent key={index} />;
            })}
        </>
      ) : (
        <>
          {data.map((item, index) => {
            return <TaskComponent key={index} data={item} />;
          })}
        </>
      )}
    </Grid2>
  );
};

const TaskComponent = ({ data }: { data: TaskInterface }) => {
  const router = useRouter();
  const { tag, priority, title, endAt, startAt, status } = data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chipColor: any = getPriorityChipColor(priority);
  if (priority === "high") {
    chipColor = "error";
  } else if (priority === "medium") {
    chipColor = "warning";
  }
  let borderColor = "primary.main";
  if (status === "completed") {
    borderColor = "green";
  } else if (status === "paused") {
    borderColor = "yellow";
  }

  return (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <Stack
        component={Paper}
        sx={{
          p: "1rem",
          height: "100%",
          minHeight: "140px",
          borderLeft: "10px solid",
          borderColor: borderColor,
          borderRadius: "15px",
          textTransform: "capitalize",
          cursor: "pointer",
        }}
        justifyContent={"flex-start"}
        gap={".5rem"}
        onClick={() => {
          router.push(`/tasks/${data.id}`);
        }}
      >
        <TextDarkSecondary>{tag}</TextDarkSecondary>
        <Chip
          variant="filled"
          label={`${priority} Priority`}
          size="small"
          sx={{ width: "50%" }}
          color={chipColor}
        ></Chip>
        <PrimaryHeaderDark>{title}</PrimaryHeaderDark>

        <TextDarkSecondary sx={{ justifySelf: "flex-end" }}>
          {endAt
            ? `Till ${dayjs(endAt).format("DD MMMM, YYYY")}`
            : `Created ${dayjs(startAt).format("DD MMMM, YYYY")}`}
        </TextDarkSecondary>
      </Stack>
    </Grid2>
  );
};
const LoadingTaskComponent = () => {
  return (
    <Grid2 size={{ xs: 12, md: 4 }}>
      <Stack
        component={Paper}
        sx={{ p: "1rem", height: "140px" }}
        justifyContent={"flex-start"}
        gap={".5rem"}
      >
        <Skeleton variant="rectangular" width={"50%"} />
        <Skeleton variant="rectangular" width={"40%"} />
        <Skeleton variant="rectangular" width={"60%"} />
        <Skeleton variant="rectangular" width={"50%"} />
      </Stack>
    </Grid2>
  );
};

export default TasksComponent;
