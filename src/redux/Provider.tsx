"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("provider as well");

  return <Provider store={store}>{children}</Provider>;
}
