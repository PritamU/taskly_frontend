"use client";
import { Stack } from "@mui/material";
import RegisterComponent from "./RegisterComponent";

const RegisterPageComponent = () => {
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
        <RegisterComponent />
      </Stack>
    </>
  );
};

export default RegisterPageComponent;
