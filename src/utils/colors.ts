import { PriorityTypes, StatusTypes } from "@/data/commonTypes";

const getPriorityChipColor = (priority: PriorityTypes) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chipColor: any = "primary";
  if (priority === "high") {
    chipColor = "error";
  } else if (priority === "medium") {
    chipColor = "warning";
  }
  return chipColor;
};

const getStatusChipColor = (status: StatusTypes) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let chipColor: any = "primary";
  if (status === "paused") {
    chipColor = "warning";
  } else if (status === "completed") {
    chipColor = "success";
  } else if (status === "pending") {
    chipColor = "secondary";
  }
  return chipColor;
};

export { getPriorityChipColor, getStatusChipColor };
