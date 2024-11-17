import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "../_helpers/server";

const layout = ({ children }: { children: ReactNode }) => {
  if (auth.isAuthenticated()) redirect("/en-test");
  return <React.Fragment>{children}</React.Fragment>;
};

export default layout;
