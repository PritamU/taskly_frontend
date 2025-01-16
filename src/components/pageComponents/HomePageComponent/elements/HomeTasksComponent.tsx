import EmptyTaskComponent from "@/components/globalComponents/common/EmptyTaskComponent";
import TasksComponent from "@/components/globalComponents/common/TasksComponent";
import ViewMoreIcon from "@/components/globalComponents/common/ViewMoreIcon";
import {
  IconButtonDark,
  PrimaryHeaderDark,
  TextDarkSecondary,
} from "@/components/globalComponents/globalStyledComponents";
import { TaskInterface } from "@/redux/commonInterfaces";
import { setSort } from "@/redux/slices/taskSlice";
import { RootState } from "@/redux/store";
import {
  KeyboardDoubleArrowDownOutlined,
  KeyboardDoubleArrowUpOutlined,
} from "@mui/icons-material";
import { MenuItem, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SelectComponent } from "../homePageStyles";

const selectComponentData = [
  {
    title: "Created At",
    value: "createdAt",
  },
  {
    title: "Title",
    value: "title",
  },
  {
    title: "End At",
    value: "endAt",
  },
];

const HomeTasksComponent = ({
  title,
  data,
  isLoading,
  showViewAll,
}: {
  title: string;
  data: TaskInterface[];
  isLoading: boolean;
  showViewAll: boolean;
}) => {
  const { sortField, sortValue } = useSelector(
    (state: RootState) => state.task
  );
  const dispatch = useDispatch();
  const onFilterChange = (value: string) => {
    dispatch(setSort({ sortField: value, sortValue: "ASC" }));
  };
  const onSortChange = (value: "ASC" | "DESC") => {
    if (value === "ASC") {
      value = "DESC";
    } else {
      value = "ASC";
    }
    dispatch(setSort({ sortField, sortValue: value }));
  };

  return (
    <>
      <Stack sx={{ p: "1rem" }} gap={"1rem"} width={"100%"}>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PrimaryHeaderDark sx={{ textTransform: "capitalize" }}>
            {title}
          </PrimaryHeaderDark>
          {showViewAll && data.length > 0 && (
            <ViewMoreIcon value={1} title={title} />
          )}
          {!showViewAll && (
            <SelectComponent
              size="small"
              value={sortField}
              onChange={(e) => onFilterChange(e.target.value as string)}
            >
              {selectComponentData.map((item) => {
                const { title, value } = item;
                return (
                  <MenuItem
                    key={value}
                    value={value}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextDarkSecondary>{title}</TextDarkSecondary>
                    {sortField === value && (
                      <IconButtonDark
                        size="small"
                        sx={{ fontSize: "1rem" }}
                        onClick={() => {
                          onSortChange(sortValue);
                        }}
                      >
                        {sortValue === "ASC" ? (
                          <KeyboardDoubleArrowUpOutlined fontSize="inherit" />
                        ) : (
                          <KeyboardDoubleArrowDownOutlined fontSize="inherit" />
                        )}
                      </IconButtonDark>
                    )}
                  </MenuItem>
                );
              })}
            </SelectComponent>
          )}
        </Stack>
        <Stack>
          {!isLoading && data.length === 0 ? (
            <EmptyTaskComponent title="Oops! No Tasks Found!" type="task" />
          ) : (
            <TasksComponent isLoading={isLoading} data={data} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default HomeTasksComponent;
