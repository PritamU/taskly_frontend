"use client";

import ReduxProvider from "../../redux/Provider";
import ClientLayout from "./ClientLayout";

const ReduxProviderLayout = ({ children }: { children: React.ReactNode }) => {
  console.log("redux provider");

  return (
    <>
      <ReduxProvider>
        <ClientLayout>{children}</ClientLayout>
      </ReduxProvider>
    </>
  );
};

export default ReduxProviderLayout;
