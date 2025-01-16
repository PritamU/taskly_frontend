import {
  PrimaryButton,
  PrimaryHeaderDark,
  TextDark,
  TextDarkSecondary,
} from "@/components/globalComponents/globalStyledComponents";
import { useLogoutUserMutation } from "@/redux/apis/userApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setIsUserUpdateLoading, setSnackbar } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { Avatar, Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AboutComponent = () => {
  const { name, email, isUserUpdateLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser, { isError, isLoading, isSuccess, data, error }] =
    useLogoutUserMutation();

  // handle logout
  const logoutHandler = async () => {
    try {
      if (isUserUpdateLoading) {
        return;
      }
      await logoutUser();
    } catch (e) {
      let message = "Some Error Occured";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
    }
  };

  // handle api call for logout
  useEffect(() => {
    try {
      if (isLoading) {
        dispatch(setIsUserUpdateLoading(true));
      }
      if (isError) {
        let message = "Some Error Occured";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        throw new Error(message);
      }
      if (isSuccess) {
        localStorage.removeItem("user.sid");
        dispatch(
          setSnackbar({
            open: true,
            type: "success",
            message: "User Logged Out!",
          })
        );
        dispatch(setIsUserUpdateLoading(false));
        router.push("/login");
      }
    } catch (e) {
      let message = "Some Error Occured";
      if (e instanceof Error) {
        message = e.message;
      }
      dispatch(setSnackbar({ open: true, type: "error", message }));
      dispatch(setIsUserUpdateLoading(false));
    }
  }, [isError, isSuccess, isLoading, data, error, dispatch, router]);

  return (
    <Stack
      gap={"1rem"}
      p={"2rem"}
      sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
    >
      <Stack
        p={"1rem"}
        component={Paper}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack flexDirection={"row"} alignItems={"flex-start"} gap={".5rem"}>
          <Avatar sx={{ bgcolor: "primary.main" }}>{name[0]}</Avatar>
          <div>
            <TextDark>{name}</TextDark>
            <TextDarkSecondary sx={{ textTransform: "lowercase !important" }}>
              {email}
            </TextDarkSecondary>
          </div>
        </Stack>
        <Stack>
          <Button
            variant="outlined"
            disabled={isUserUpdateLoading}
            color="error"
            onClick={() => logoutHandler()}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
      <Stack gap={"1rem"} alignItems={"center"} p={"1rem"}>
        <PrimaryHeaderDark>ABOUT THE CREATOR</PrimaryHeaderDark>
        <Avatar
          alt="Pritam Upadhya"
          sx={{
            fontSize: "2rem",
            width: "70px",
            height: "70px",
            bgcolor: "primary.main",
          }}
        >
          P
        </Avatar>
        <PrimaryHeaderDark>Pritam Upadhya</PrimaryHeaderDark>
        <TextDarkSecondary sx={{ fontSize: "1rem", textAlign: "center" }}>
          Hi I’m Pritam Upadhya, a Full Stack developer based in Guwahati,
          India. I’m turning ideas into reliable web applications. Let’s build
          something amazing.
        </TextDarkSecondary>
        <PrimaryButton>View Portfolio</PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default AboutComponent;
