import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "../_helpers/server";
import MaxWidthWrapper from "../_components/wrappers/max-width-wrapper";

const layout = ({ children }: { children: ReactNode }) => {
  // If not logged redirect to login page
  if (!auth.isAuthenticated) redirect("/");

  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
};

export default layout;
