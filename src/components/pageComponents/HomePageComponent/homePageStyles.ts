import { Select, styled } from "@mui/material";

const SelectComponent = styled(Select)(({}) => ({
  width: "50%",
  maxWidth: "200px",
  background: "white",
  color: "black",
  "& .MuiSelect-select": {
    paddingRight: "1rem !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .MuiSelect-icon": {
    display: "none",
  },
}));

export { SelectComponent };
