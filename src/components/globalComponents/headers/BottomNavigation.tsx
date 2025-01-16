import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TaskAlt from "@mui/icons-material/TaskAlt";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import { CustomBottomNavigationComponent } from "./customComponents";

const BottomNavigationComponent = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <CustomBottomNavigationComponent showLabels>
      <BottomNavigationAction
        sx={{ color: pathname === "/" ? "primary.main" : "primary.light" }}
        onClick={() => router.push("/")}
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        sx={{ color: pathname === "/tasks" ? "primary.main" : "primary.light" }}
        onClick={() => router.push("/tasks")}
        label="Tasks"
        icon={<TaskAlt />}
      />
      <BottomNavigationAction
        sx={{ color: pathname === "/tasks" ? "primary.main" : "primary.light" }}
        label="About"
        onClick={() => router.push("/about")}
        icon={<PersonIcon />}
      />
    </CustomBottomNavigationComponent>
  );
};

export default BottomNavigationComponent;
