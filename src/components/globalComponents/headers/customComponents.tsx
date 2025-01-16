import { AppBar, BottomNavigation, styled, Toolbar } from "@mui/material";

// Mobile Header Custom Component
const CustomMobileHeader = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderColor: "transparent !important",
  [theme.breakpoints.up("sm")]: {
    display: "none", // Applies for small screens and up
  },
}));

// Mobile Header Toolbar Custom Component
const CustomMobileHeaderToolbar = styled(Toolbar)(({ theme }) => ({
  borderColor: "transparent !important",
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: "none",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

// Mobile Header Custom Component
const CustomMobileSubHeader = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.up("sm")]: {
    display: "none", // Applies for small screens and up
  },
}));

// Mobile SubHeader Toolbar Custom Component
const CustomMobileSubHeaderToolbar = styled(Toolbar)(({}) => ({
  backgroundColor: "white",
  justifyContent: "space-between",
}));

// Mobile Header Custom Component
const CustomDesktopHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  [theme.breakpoints.down("sm")]: {
    display: "none", // Applies for small screens and up
  },
}));

// Mobile SubHeader Toolbar Custom Component
const CustomDesktopHeaderToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100vw",
}));

// Mobile SubHeader Toolbar Custom Component
const CustomBottomNavigationComponent = styled(BottomNavigation)(
  ({ theme }) => ({
    width: "100vw",
    position: "fixed",
    bottom: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none", // Applies for small screens and up
    },
  })
);

export {
  CustomBottomNavigationComponent,
  CustomDesktopHeader,
  CustomDesktopHeaderToolbar,
  CustomMobileHeader,
  CustomMobileHeaderToolbar,
  CustomMobileSubHeader,
  CustomMobileSubHeaderToolbar,
};
