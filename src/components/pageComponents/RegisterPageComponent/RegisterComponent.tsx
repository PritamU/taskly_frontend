import GlobalTextField from "@/components/globalComponents/common/GlobalTextField";
import {
  PrimaryButton,
  PrimaryHeaderDark,
  TextDark,
} from "@/components/globalComponents/globalStyledComponents";
import { APP_NAME } from "@/data/constants";
import { useRegisterUserMutation } from "@/redux/apis/userApi";
import { ApiErrorInterface } from "@/redux/commonInterfaces";
import { setSnackbar, setUser } from "@/redux/slices/userSlice";
import { Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TextFieldLabel } from "../LoginPageComponent/styledComponents";

interface FormValuesInterface {
  Email: {
    value: string;
    hasError: boolean;
  };
  Password: {
    value: string;
    hasError: boolean;
  };
  Name: {
    value: string;
    hasError: boolean;
  };
}

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  const [formValues, setFormValues] = useState<FormValuesInterface>({
    Email: { value: "", hasError: true },
    Password: { value: "", hasError: true },
    Name: { value: "", hasError: true },
  });

  const formValueHandler = (
    fieldName: string,
    value: string,
    hasError: boolean,
    isOptional?: boolean
  ) => {
    const updatedField = { [fieldName]: { value, hasError } };
    setFormValues({ ...formValues, ...updatedField });
  };

  const [registerUser, { data, isSuccess, isError, error, isLoading }] =
    useRegisterUserMutation();

  const onSubmitHandler = async () => {
    setShowErrors(true);
    try {
      if (
        formValues.Email.hasError ||
        formValues.Name.hasError ||
        formValues.Password.hasError
      ) {
        throw new Error(`Incorrect Entries Detected!`);
      }
      await registerUser({
        name: formValues.Name.value,
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
            message: `Welcome to ${APP_NAME}`,
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
        <PrimaryHeaderDark variant="h1">Create Your Account</PrimaryHeaderDark>
        <TextDark>
          Gain Access to all our features by registering your account.
        </TextDark>
        <TextDark sx={{ color: red[300] }}>
          *No Email Confirmation Required*
        </TextDark>
      </Stack>
      {/* Username */}
      <Stack
        sx={{
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <TextFieldLabel variant="h1">Name</TextFieldLabel>
        <GlobalTextField
          fieldName="Name"
          fieldValue={formValues.Name}
          fieldValueChangeHandler={formValueHandler}
          fieldType="text"
          minMaxLength={{ min: 3, max: 30 }}
          showErrors={showErrors}
        />
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
        Register
      </PrimaryButton>
      <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
        <Link href={"/login"}>Account Exists? Login to your account</Link>
      </Stack>
    </Stack>
  );
};

export default RegisterComponent;
