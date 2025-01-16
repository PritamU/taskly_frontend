import { setCurrentTab } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { Chip, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const data = [
  {
    title: "all",
  },
  {
    title: "personal",
  },
  {
    title: "work",
  },
  {
    title: "chores",
  },
  {
    title: "study",
  },
  {
    title: "health",
  },
];

const TabsComponent = () => {
  const { currentTab } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Tabs
        value={false}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
      >
        {data.map((item, index) => {
          const { title } = item;

          const isCurrent = currentTab === title;

          return (
            <Chip
              sx={{
                fontSize: ".7rem",
                fontWeight: 400,
                textTransform: "capitalize",
                margin: "0 .5rem",
                padding: "0",
              }}
              key={index}
              label={title}
              variant={isCurrent ? "filled" : "outlined"}
              color="primary"
              onClick={() => dispatch(setCurrentTab(title))}
            />
          );
        })}
      </Tabs>
    </>
  );
};

export default TabsComponent;
