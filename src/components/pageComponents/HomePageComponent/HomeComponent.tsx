import CreateTaskPopup from "@/components/globalComponents/common/CreateTaskPopup";
import { RootState } from "@/redux/store";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import HomeTasksComponent from "./elements/HomeTasksComponent";
import StatCard from "./elements/StatCard";
import TabsComponent from "./elements/TabsComponent";

const HomeComponent = () => {
  const {
    inProgressTasks,
    completedTasks,
    lateTasks,
    isLoading,
    countOfCompletedTasks,
    countOfIncompleteTasks,
  } = useSelector((state: RootState) => state.user);

  return (
    <Stack>
      <StatCard
        title="Today's Tasks"
        data={{
          total: countOfIncompleteTasks,
          completed: countOfCompletedTasks,
        }}
      />
      <TabsComponent />
      <HomeTasksComponent
        title="in progress"
        data={inProgressTasks}
        isLoading={isLoading}
        showViewAll={true}
      />
      {lateTasks.length > 0 && (
        <HomeTasksComponent
          title="late"
          data={lateTasks}
          isLoading={isLoading}
          showViewAll={true}
        />
      )}
      {completedTasks.length > 0 && (
        <HomeTasksComponent
          title="completed"
          data={completedTasks}
          isLoading={isLoading}
          showViewAll={true}
        />
      )}
      <CreateTaskPopup />
    </Stack>
  );
};

export default HomeComponent;
