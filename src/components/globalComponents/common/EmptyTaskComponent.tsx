import { Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
          <PrimaryButtonSecondary
            size="small"
            onClick={() => {
              router.push("/tasks/create-task");
            }}
          >
            Create a Task
          </PrimaryButtonSecondary>
        )}
      </Stack>
    </Stack>
  );
};

export default EmptyTaskComponent;
