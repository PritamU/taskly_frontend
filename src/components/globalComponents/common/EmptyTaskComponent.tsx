import { Stack } from "@mui/material";
import Image from "next/image";
import {
  PrimaryButtonSecondary,
  TextDarkSecondary,
} from "../globalStyledComponents";

const EmptyTaskComponent = ({
  title,
  type,
}: {
  title: string;
  type: "task" | "subtask";
}) => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Stack gap={"1rem"} alignItems={"center"}>
        <Image
          src={"/nodata.svg"}
          alt="No Data Found"
          width={150}
          height={150}
        />
        <TextDarkSecondary>{title}</TextDarkSecondary>
        {type === "task" && (
          <PrimaryButtonSecondary size="small">
            Create a Task
          </PrimaryButtonSecondary>
        )}
      </Stack>
    </Stack>
  );
};

export default EmptyTaskComponent;
