import CreateTaskPopup from "@/components/globalComponents/common/CreateTaskPopup";
import { setPage, setSearchKey } from "@/redux/slices/taskSlice";
import { RootState } from "@/redux/store";
import useDebounce from "@/utils/useDebounce";
import { Search } from "@mui/icons-material";
import { Pagination, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeTasksComponent from "../../HomePageComponent/elements/HomeTasksComponent";
import { CustomTextField } from "../../LoginPageComponent/styledComponents";

const TaskListComponent = () => {
  const { taskList, isTaskListLoading, totalTasks, limit, page } = useSelector(
    (state: RootState) => state.task
  );
  const [localSearchKey, setLocalSearchKey] = useState<string>("");
  const params = useSearchParams();
  const dispatch = useDispatch();

  let title = "All Tasks";

  if (params.get("status")) {
    title = `${params.get("status")?.replace("-", " ")}`;
  }
  if (params.get("tag")) {
    title = `${title} ${params.get("tag")?.replace("-", " ")} Tasks`;
  }

  // debounce handler
  const debouncedSearch = useDebounce(localSearchKey, 500);

  // call API Request here
  useEffect(() => {
    dispatch(setSearchKey(debouncedSearch));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Stack gap={"1rem"} py={"1rem"} alignItems={"center"}>
      <CustomTextField
        size="small"
        placeholder="Search Your Task"
        fullWidth
        slotProps={{
          input: {
            startAdornment: <Search sx={{ mr: ".5rem" }} />,
          },
        }}
        value={localSearchKey}
        onChange={(e) => setLocalSearchKey(e.target.value)}
      />

      <HomeTasksComponent
        data={taskList}
        isLoading={isTaskListLoading}
        title={title}
        showViewAll={false}
      />
      {Math.ceil(totalTasks / limit) > 0 && (
        <Pagination
          count={Math.ceil(totalTasks / limit)}
          color="primary"
          page={page}
          onChange={(e, value) => {
            dispatch(setPage(value));
          }}
        />
      )}
      <CreateTaskPopup />
    </Stack>
  );
};

export default TaskListComponent;
