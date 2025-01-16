"use client";
import { Stack } from "@mui/material";
import LoginComponent from "./LoginComponent";

const LoginPageComponent = () => {
  return (
    <>
      <Stack
        sx={{
          width: "100%",
          height: "calc(100vh - 100px)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginComponent />
      </Stack>
    </>
  );
};

export default LoginPageComponent;
