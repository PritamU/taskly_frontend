import { RootState } from "@/redux/store";
import NotificationsSharp from "@mui/icons-material/NotificationsSharp";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { PrimaryHeaderDark } from "../globalStyledComponents";
import {
  CustomMobileHeader,
  CustomMobileHeaderToolbar,
} from "./customComponents";

const MobileHeader = () => {
  const { name } = useSelector((state: RootState) => state.user);
  return (
    <CustomMobileHeader>
      <CustomMobileHeaderToolbar>
        <PrimaryHeaderDark>
          Good Morning,{" "}
          <span style={{ fontWeight: 500 }}>{name || "User"}</span>
        </PrimaryHeaderDark>
        <IconButton size="small">
          <NotificationsSharp sx={{ color: "text.primary" }} />
        </IconButton>
      </CustomMobileHeaderToolbar>
    </CustomMobileHeader>
  );
};

export default MobileHeader;
