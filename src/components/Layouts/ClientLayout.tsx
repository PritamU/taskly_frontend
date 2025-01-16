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
      // if ("data" in error) {
      //   const errorData = error.data as ApiErrorInterface;
      dispatch(
        setSnackbar({
          open: true,
          message: JSON.stringify(error),
          type: "info",
        })
      );
      // }
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
            },
          }}
        />

        <DesktopHeader />
        <Container maxWidth="lg">{children}</Container>
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
        <Footer />
        {!dontShowBottomNav && (
          <>
            <div style={{ height: "100px" }}></div>
            <BottomNavigationComponent />
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default Layout;
