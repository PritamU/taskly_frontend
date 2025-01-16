import { ListAlt, Person } from "@mui/icons-material";
import { Stack, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconButtonLight, PrimaryHeaderLight } from "../globalStyledComponents";
import {
  CustomDesktopHeader,
  CustomDesktopHeaderToolbar,
} from "./customComponents";

const DesktopHeader = () => {
  const router = useRouter();
  return (
    <CustomDesktopHeader>
      <CustomDesktopHeaderToolbar>
        <PrimaryHeaderLight sx={{ color: "whitesmoke" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            href={"/"}
          >
            TASKMYSHIT
          </Link>
        </PrimaryHeaderLight>
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
