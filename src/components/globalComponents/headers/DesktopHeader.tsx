import { ListAlt, Person } from "@mui/icons-material";
import { Stack, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconButtonLight } from "../globalStyledComponents";
import {
  CustomDesktopHeader,
  CustomDesktopHeaderToolbar,
} from "./customComponents";

const DesktopHeader = () => {
  const router = useRouter();
  return (
    <CustomDesktopHeader>
      <CustomDesktopHeaderToolbar>
        <Link
          style={{
            textDecoration: "none",
            color: "inherit",
            height: "30px",
            width: "150px",
            position: "relative",
          }}
          href={"/"}
        >
          <Image src="/logo-light.webp" alt="Taskly" fill />
        </Link>
        <Stack flexDirection={"row"} alignItems={"center"} gap={".5rem"}>
          <IconButtonLight
            onClick={() => {
              router.push("/tasks");
            }}
          >
            <Tooltip title="View All Tasks">
              <ListAlt />
            </Tooltip>
          </IconButtonLight>
          <IconButtonLight
            onClick={() => {
              router.push("/about");
            }}
          >
            <Tooltip title="About">
              <Person />
            </Tooltip>
          </IconButtonLight>
        </Stack>
      </CustomDesktopHeaderToolbar>
    </CustomDesktopHeader>
  );
};

export default DesktopHeader;
