import { styled, TextField, Typography } from "@mui/material";

const TextFieldLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  fontWeight: 600,
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  // backgroundColor: "white",
  "& .MuiInputBase-root": {
    backgroundColor: "white",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white !important",
  },
}));

export { CustomTextField, TextFieldLabel };
