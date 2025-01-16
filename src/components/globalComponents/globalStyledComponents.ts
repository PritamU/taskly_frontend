import { Button, IconButton, styled, Typography } from "@mui/material";

const PrimaryHeaderDark = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.1rem",
  fontWeight: 700,
}));
const PrimaryHeaderLight = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "1.1rem",
  fontWeight: 700,
}));
const TextDark = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
}));
const TextDarkSecondary = styled(Typography)(({}) => ({
  color: "gray",
  fontSize: ".8rem",
  textTransform: "capitalize",
}));
const TextLight = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "1rem",
}));

const IconButtonLight = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

const IconButtonDark = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  "&:disabled": {
    color: theme.palette.primary.contrastText,
    background: "gray",
  },
  borderRadius: "2rem",
  fontWeight: 600,
  padding: ".3rem 2rem",
}));
const PrimaryButtonSecondary = styled(PrimaryButton)(({}) => ({
  fontWeight: 400,
  fontSize: ".8rem",
  textTransform: "capitalize",
}));

export {
  IconButtonDark,
  IconButtonLight,
  PrimaryButton,
  PrimaryButtonSecondary,
  PrimaryHeaderDark,
  PrimaryHeaderLight,
  TextDark,
  TextDarkSecondary,
  TextLight,
};
