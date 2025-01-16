import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { IconButtonLight } from "../globalStyledComponents";
const CreateTaskPopup = () => {
  const router = useRouter();
  return (
    <IconButtonLight
      onClick={() => {
        router.push("/tasks/create-task");
      }}
      sx={{
        position: "fixed",
        bottom: "5rem",
        right: "2rem",
        fontSize: "2rem",
        bgcolor: "primary.main",
        "&:hover": {
          bgcolor: "primary.main",
        },
      }}
    >
      <AddIcon fontSize="inherit" />
    </IconButtonLight>
  );
};

export default CreateTaskPopup;
