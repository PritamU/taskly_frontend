import { RootState } from "@/redux/store";
import { ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IconButtonDark } from "../globalStyledComponents";

const ViewMoreIcon = ({ value, title }: { value: number; title: string }) => {
  const { currentTab } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  let path = "/tasks";
  if (title === "completed") {
    path = `${path}?tag=${currentTab}&status=completed`;
  } else if (title === "in progress") {
    path = `${path}?tag=${currentTab}&status=in-progress`;
  } else if (title === "completed") {
    path = `${path}?tag=${currentTab}&status=in-progress`;
  }

  return (
    <IconButtonDark
      sx={{
        fontSize: ".8rem",
        color: "gray",
      }}
      onClick={() => router.push(path)}
    >
      {value}
      <ArrowForwardIos fontSize="inherit" />
    </IconButtonDark>
  );
};

export default ViewMoreIcon;
