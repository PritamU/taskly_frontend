"use client";

import { clientTheme } from "@/config/muiTheme";
import {
  bottomNavigationExcludeRoutes,
  headerMarginExcludeRoutes,
  subHeaderExcludeRoutes,
} from "@/data/routeData";
import { useCheckUserAuthQuery } from "@/redux/apis/userApi";
import { setSnackbar, setUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import {
  Alert,
  Box,
  Container,
  CssBaseline,
  Snackbar,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../globalComponents/Footer";
import BottomNavigationComponent from "../globalComponents/headers/BottomNavigation";
import DesktopHeader from "../globalComponents/headers/DesktopHeader";
import MobileHeader from "../globalComponents/headers/MobileHeader";
import MobileSubHeader from "../globalComponents/headers/MobileSubHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { snackBar } = useSelector((state: RootState) => state.user);

  const isHomePage = path === "/";

  const { isError, isSuccess, error, data, isLoading } =
    useCheckUserAuthQuery();

  useEffect(() => {
    if (isSuccess) {
      const { email, name } = data.data;
      dispatch(setUser({ name, email, isAuth: true }));
    }
    if (isError) {
      dispatch(setUser({ name: "", email: "", isAuth: false }));
      router.push("/login");
    }
  }, [isError, isSuccess, error, data, isLoading, dispatch, router]);

  const dontShowBottomNav = bottomNavigationExcludeRoutes.some((item) => {
    return path.includes(item);
  });

  return (
    <>
      <ThemeProvider theme={clientTheme}>
        <CssBaseline />
        {isHomePage && (
          <>
            <MobileHeader />
          </>
        )}

        {!subHeaderExcludeRoutes.includes(path) && <MobileSubHeader />}

        {/* toolbar to add margin at the top to match the header component */}
        <Toolbar
          sx={{
            display: {
              xs: headerMarginExcludeRoutes.includes(path) ? "none" : "flex",
              sm: "flex",
              p: ".5rem",
            },
          }}
        />

        <DesktopHeader />
        <Container maxWidth="lg" sx={{ minHeight: { sm: "100vh" } }}>
          {children}
        </Container>
        {snackBar.open && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackBar.open}
            autoHideDuration={5000}
            onClose={() =>
              dispatch(setSnackbar({ open: false, message: "", type: "info" }))
            }
          >
            <Alert
              onClose={() =>
                dispatch(
                  setSnackbar({ open: false, message: "", type: "info" })
                )
              }
              severity={snackBar.type}
              variant="filled"
              sx={{ width: "100%", maxWidth: "300px" }}
            >
              {snackBar.message}
            </Alert>
          </Snackbar>
        )}

        {!dontShowBottomNav && (
          <>
            <Box
              sx={{ height: "100px", display: { xs: "block", sm: "none" } }}
            ></Box>
            <BottomNavigationComponent />
          </>
        )}

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
