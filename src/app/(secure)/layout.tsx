import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "../_helpers/server";

const layout = ({ children }: { children: ReactNode }) => {
  // If not logged redirect to login page
  if (!auth.isAuthenticated) redirect("/");

  return <React.Fragment>{children}</React.Fragment>;
};

export default layout;
