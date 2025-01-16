import ReduxProviderLayout from "@/components/Layouts/ReduxProviderLayout";
// or `v1X-appRouter` if you are using Next.js v1X
import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "Taskly | Pritam Upadhya",
  description: "A Task Management App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("root layout");
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ReduxProviderLayout>{children}</ReduxProviderLayout>
        </Suspense>
      </body>
    </html>
  );
}
