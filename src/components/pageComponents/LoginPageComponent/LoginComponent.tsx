import GlobalTextField from "@/components/globalComponents/common/GlobalTextField";
import {
  PrimaryButton,
  PrimaryHeaderDark,
  TextDark,
} from "@/components/globalComponents/globalStyledComponents";
import { APP_NAME } from "@/data/constants";
import { useLoginUserMutation } from "@/redux/apis/userApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setSnackbar, setUser } from "@/redux/slices/userSlice";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TextFieldLabel } from "./styledComponents";

interface FormValuesInterface {
  Email: {
    value: string;
    hasError: boolean;
  };
  Password: {
    value: string;
    hasError: boolean;
  };
}

const LoginComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValuesInterface>({
    Email: { value: "", hasError: true },
    Password: { value: "", hasError: true },
  });
  const [showErrors, setShowErrors] = useState(false);

  const formValueHandler = (
    fieldName: string,
    value: string,
    hasError: boolean
  ) => {
    const updatedField = { [fieldName]: { value, hasError } };
    setFormValues({ ...formValues, ...updatedField });
  };

  const [loginUser, { data, isSuccess, isError, error, isLoading }] =
    useLoginUserMutation();

  const onSubmitHandler = async () => {
    setShowErrors(true);
    try {
      if (formValues.Email.hasError || formValues.Password.hasError) {
        throw new Error(`Incorrect Entries Detected!`);
      }
      await loginUser({
        email: formValues.Email.value,
        password: formValues.Password.value,
      });
    } catch (e) {
      if (e instanceof Error) {
        dispatch(
          setSnackbar({ open: true, type: "error", message: e.message })
        );
        return;
      }
      dispatch(
        setSnackbar({
          open: true,
          type: "error",
          message: "Some Error Occured!",
        })
      );
    }
  };

  useEffect(() => {
    try {
      if (isSuccess) {
        dispatch(
          setSnackbar({
            open: true,
            type: "success",
            message: `Welcome back to ${APP_NAME}`,
          })
        );
        dispatch(setUser({ name: "", email: "", isAuth: true }));
        if (process.env.NEXT_PUBLIC_ENV === "development") {
          localStorage.setItem("user.sid", data!.message);
        }
        router.push("/");
      }
      if (isError) {
        let message = "Some Error Occured!";
        if ("data" in error) {
          const errorData = error.data as ApiErrorInterface;
          message = errorData.message;
        }
        dispatch(
          setSnackbar({
            open: true,
            type: "warning",
            message,
          })
        );
      }
    } catch (e) {
      let message = "Some Error Occured!";
      if (e instanceof Error) {
        message = e.message;
        return;
      }
      dispatch(
        setSnackbar({
          open: true,
          type: "error",
          message,
        })
      );
    }
  }, [isSuccess, isError, error, isLoading, data, dispatch, router]);

  return (
    <Stack
      component="form"
      sx={{
        width: "100%",
        maxWidth: "400px",
        flexDirection: "column",
        justifyContent: "flex-start",
        rowGap: 3,
        alignItems: "flex-start",
        padding: "2rem",
        boxShadow: { md: 3 },
        borderRadius: "2rem",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler();
      }}
    >
      <Stack
        sx={{
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <PrimaryHeaderDark variant="h1">
          Login to Your Account
        </PrimaryHeaderDark>
        <TextDark>
          Gain Access to all your tasks by logging into your account.
        </TextDark>
      </Stack>

      {/* Email */}
      <Stack
        sx={{
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <TextFieldLabel variant="h1">Email</TextFieldLabel>
        <GlobalTextField
          fieldName="Email"
          fieldValue={formValues.Email}
          fieldValueChangeHandler={formValueHandler}
          fieldType="email"
          minMaxLength={{ min: 3, max: 50 }}
          showErrors={showErrors}
        />
      </Stack>

      {/* Password */}
      <Stack
        sx={{
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <TextFieldLabel variant="h1">Password</TextFieldLabel>
        <GlobalTextField
          fieldName="Password"
          fieldValue={formValues.Password}
          fieldValueChangeHandler={formValueHandler}
          fieldType="password"
          minMaxLength={{ min: 8, max: 20 }}
          showErrors={showErrors}
        />
      </Stack>

      <PrimaryButton variant="contained" fullWidth type="submit">
        Login
      </PrimaryButton>
      <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
        <Link href={"/register"}>New User? Create An Account</Link>
      </Stack>
    </Stack>
  );
};

export default LoginComponent;
