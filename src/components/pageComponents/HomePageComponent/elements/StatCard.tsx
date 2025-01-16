import {
  PrimaryHeaderLight,
  TextLight,
} from "@/components/globalComponents/globalStyledComponents";
import { Stack } from "@mui/material";
import Image from "next/image";

const StatCard = ({
  title,
  data,
}: {
  title: string;
  data: { total: number; completed: number };
}) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "120px",
        bgcolor: "secondary.main",
        my: "1rem",
        borderRadius: "2rem",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        p: "1rem 2rem",
      }}
    >
      <Stack>
        <PrimaryHeaderLight>{title}</PrimaryHeaderLight>
        <TextLight sx={{ letterSpacing: "3px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
            {data.completed}
          </span>
          /{data.total} Tasks
        </TextLight>
      </Stack>
      <Stack>
        <Image src="/secretary.png" alt="Tasks" width={100} height={100} />
      </Stack>
    </Stack>
  );
};

export default StatCard;
